// One-time conversion of the Contentful export into git content.
// Reads .migration/contentful/*.json (from contentful-fetch.ts) and the dHash cache,
// assigns stable photo ids (reusing archive ids for duplicates), and writes:
//   content/photos/library.json   what to ingest: id, source file, flags, editorial fields
//   content/chapters/*.md         one file per extendedGallery (a "chapter" on the site)
//   content/posts/*.md            one file per post
//
// One-time: re-running regenerates content/chapters, content/posts and
// content/photos/library.json from the export and overwrites any hand edits.
//
// Usage: node scripts/import/contentful-build.ts

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ChapterFrontmatter, PostFrontmatter } from "../../lib/schemas.ts";
import { archiveIdFromFilename, seriesPhotoId } from "../photos/lib/ids.ts";
import { type LibraryEntry, writeLibrary } from "../photos/lib/library.ts";
import { repoRoot } from "../photos/lib/paths.ts";
import { assetFile } from "./contentful-files.ts";
import { bestMatch, type Hashed, hashAll } from "./dedupe.ts";

const MERGE_DISTANCE = 4;

type Link = { sys: { id: string } };
type Entry = { sys: { id: string; contentType: { sys: { id: string } } }; fields: Record<string, any> };
type Asset = {
	sys: { id: string };
	fields: { title?: string; description?: string; file?: { url: string; fileName: string; contentType: string } };
};

const raw = (name: string) =>
	JSON.parse(fs.readFileSync(path.join(repoRoot, ".migration/contentful", `${name}.json`), "utf8"));
const entries: Entry[] = raw("entries");
const assets: Asset[] = raw("assets");
const entryById = new Map(entries.map((e) => [e.sys.id, e]));
const assetById = new Map(assets.map((a) => [a.sys.id, a]));
const ofType = (t: string) => entries.filter((e) => e.sys.contentType.sys.id === t);

const hashed = await hashAll();
const hashByFile = new Map(hashed.map((h) => [h.file, h]));
const archivePool = hashed.filter((h) => h.file.startsWith("archive/"));

// ---------- id assignment ----------
const idByAsset = new Map<string, string>();
const library = new Map<string, LibraryEntry & { candidates: Hashed[] }>();
const assignedContentful: { h: Hashed; id: string }[] = [];
const review: { asset: string; nearest: string; distance: number }[] = [];

const cfHash = (assetId: string) => {
	const a = assetById.get(assetId);
	if (!a?.fields.file) throw new Error(`asset ${assetId} has no file`);
	const h = hashByFile.get(`contentful/${assetFile(a as Required<Asset>)}`);
	if (!h) throw new Error(`no dHash for asset ${assetId}`);
	return h;
};

function addCandidate(id: string, h: Hashed, init: Omit<LibraryEntry, "id" | "file">) {
	const existing = library.get(id);
	if (existing) {
		if (!existing.candidates.some((c) => c.file === h.file)) existing.candidates.push(h);
		return;
	}
	library.set(id, { id, file: h.file, ...init, candidates: [h] });
}

/** Assign an id to a Contentful asset, merging with an archive photo or an earlier asset when they're the same picture. */
function assign(assetId: string, fallbackId: string, kind: "photo" | "asset"): string {
	const known = idByAsset.get(assetId);
	if (known) return known;
	const h = cfHash(assetId);
	const a = assetById.get(assetId)!;
	const alt = a.fields.description?.trim() && a.fields.description !== "Test" ? a.fields.description.trim() : null;

	let id = fallbackId;
	const nearArchive = bestMatch(h, archivePool);
	const nearEarlier = bestMatch(
		h,
		assignedContentful.map((x) => x.h),
	);
	if (nearArchive && nearArchive.d <= MERGE_DISTANCE) {
		const archiveFile = nearArchive.other.file;
		id = archiveIdFromFilename(path.basename(archiveFile));
		addCandidate(id, nearArchive.other, {
			kind: "photo",
			archive: true,
			alt: null,
			caption: null,
			title: null,
			location: null,
		});
	} else if (nearEarlier && nearEarlier.d <= MERGE_DISTANCE) {
		id = assignedContentful.find((x) => x.h.file === nearEarlier.other.file)!.id;
	} else if (nearArchive && nearArchive.d <= 10) {
		review.push({ asset: h.file, nearest: nearArchive.other.file, distance: nearArchive.d });
	}
	addCandidate(id, h, { kind, archive: false, alt, caption: null, title: null, location: null });
	if (alt && !library.get(id)!.alt) library.get(id)!.alt = alt;
	idByAsset.set(assetId, id);
	assignedContentful.push({ h, id });
	return id;
}

// Every archive original is in the library, whether or not a series uses it.
for (const h of archivePool) {
	addCandidate(archiveIdFromFilename(path.basename(h.file)), h, {
		kind: "photo",
		archive: true,
		alt: null,
		caption: null,
		title: null,
		location: null,
	});
}

// ---------- series ----------
const galleries = ofType("extendedGallery");
const LAST = ["crimson-peaks", "featured-shots", "americana"]; // reuse ids from the real series first
const ordered = [
	...galleries
		.filter((g) => !LAST.includes(g.fields.slug))
		.sort((a, b) => b.fields.publishDate.localeCompare(a.fields.publishDate)),
	...LAST.map((s) => galleries.find((g) => g.fields.slug === s)!).filter(Boolean),
];

const years = (y: string | undefined, publishDate: string) => {
	const nums = (y ?? "").match(/\d{4}/g)?.map(Number) ?? [];
	const ongoing = /ongoing/i.test(y ?? "");
	const yearStart = nums[0] ?? Number(publishDate.slice(0, 4));
	const yearEnd = ongoing ? null : (nums.at(-1) ?? yearStart);
	const display = (y ?? "")
		.replace(/\s*-\s*ongoing/i, " – ongoing")
		.replace(/^ongoing$/i, `${yearStart} – ongoing`)
		.replace(/(\d{4})\s*-\s*(\d{4})/, "$1–$2");
	return { years: display || String(yearStart), yearStart, yearEnd };
};

const tagSlug = (l: Link) => entryById.get(l.sys.id)?.fields.slug as string;

fs.mkdirSync(path.join(repoRoot, "content/chapters"), { recursive: true });
fs.mkdirSync(path.join(repoRoot, "content/posts"), { recursive: true });

let chapter = 0;
const seriesOut: string[] = [];
for (const g of ordered) {
	const f = g.fields;
	const subs = (f.galleries as Link[]).map((l) => entryById.get(l.sys.id)!).filter(Boolean);
	let n = 0;
	const sections = subs.map((sub) => {
		const ids = (sub.fields.images as Link[]).map((l) => assign(l.sys.id, seriesPhotoId(f.slug, ++n), "photo"));
		const title = sub.fields.title?.trim();
		// Keep a section title only when it adds information beyond the series title.
		const keepTitle = title && !nearlySame(title, f.title) && title.toLowerCase() !== "portfolio";
		return { ...(keepTitle ? { title } : {}), photos: [...new Set(ids)] };
	});
	const seriesIds = [...new Set(sections.flatMap((s) => s.photos))];
	const cover = f.heroImage ? assign(f.heroImage.sys.id, `${f.slug}-cover`, "photo") : seriesIds[0];
	const pilePool = seriesIds.filter((id) => id !== cover);
	const y = years(f.year, f.publishDate);
	const data = ChapterFrontmatter.parse({
		title: f.title.trim(),
		slug: f.slug,
		chapter: ++chapter,
		...y,
		date: f.publishDate.slice(0, 10),
		description: (f.metaDescription ?? f.summary ?? "").trim(),
		...(f.summary?.trim() ? { summary: f.summary.trim() } : {}),
		cover,
		...(pilePool.length >= 2 ? { pile: [pilePool[0], pilePool[1]] } : {}),
		listed: f.displayHome === true,
		tags: ((f.tags as Link[]) ?? []).map(tagSlug).filter(Boolean),
		sections,
	});
	const body = rewriteImages((f.body ?? "").trim(), f.slug);
	const file = path.join(repoRoot, "content/chapters", `${f.slug}.md`);
	fs.writeFileSync(file, matter.stringify(body ? `${body}\n` : "", stripUndefined(data)));
	seriesOut.push(
		`${String(data.chapter).padStart(2)} ${data.listed ? "listed  " : "unlisted"} ${f.slug} (${seriesIds.length} photos)`,
	);
}

// ---------- posts ----------
function rewriteImages(md: string, owner: string): string {
	let n = 0;
	return md.replace(
		/!\[([^\]]*)\]\(\s*(?:https?:)?\/\/(?:images|downloads)\.ctfassets\.net\/[^/]+\/([^/]+)\/[^\s)]+(\s+"[^"]*")?\s*\)/g,
		(_m, alt: string, assetId: string, title = "") => {
			const id = assign(assetId, `post-${owner}-${String(++n).padStart(2, "0")}`, "asset");
			const entry = library.get(id)!;
			// Old alts were file names ("mamiya-rb67-…-132"); those aren't descriptions.
			if (alt.trim() && !/^[a-z0-9]+(?:[-_][a-z0-9]+)+$/i.test(alt.trim()) && !entry.alt) entry.alt = alt.trim();
			return `![${alt}](photo:${id}${title})`;
		},
	);
}

const postsOut: string[] = [];
for (const p of ofType("post")) {
	const f = p.fields;
	const cover = assign(f.heroImage.sys.id, `post-${f.slug}-cover`, "asset");
	const data = PostFrontmatter.parse({
		title: f.title.trim(),
		slug: f.slug,
		date: f.publishDate.slice(0, 10),
		description: f.metaDescription.trim(),
		cover,
		tags: f.tags ? [tagSlug(f.tags)].filter(Boolean) : [],
	});
	const body = rewriteImages(f.body.trim(), f.slug);
	fs.writeFileSync(
		path.join(repoRoot, "content/posts", `${f.slug}.md`),
		matter.stringify(`${body}\n`, stripUndefined(data)),
	);
	postsOut.push(f.slug);
}

// ---------- library ----------
// Pick the highest-resolution source among duplicates.
const out: LibraryEntry[] = [...library.values()].map(({ candidates, ...e }) => {
	const best = candidates.reduce((a, b) => (b.width * b.height > a.width * a.height ? b : a));
	return { ...e, file: best.file };
});
writeLibrary(out);
fs.writeFileSync(path.join(repoRoot, ".migration/dedupe-review.json"), JSON.stringify(review, null, 1));

/** Same text give or take a typo ("Massachussets" vs "Massachusetts"). */
function nearlySame(a: string, b: string): boolean {
	const x = a.toLowerCase().replace(/[^a-z0-9]/g, "");
	const y = b.toLowerCase().replace(/[^a-z0-9]/g, "");
	const d = Array.from({ length: x.length + 1 }, (_, i) => [i, ...Array(y.length).fill(0)]);
	for (let j = 1; j <= y.length; j++) d[0][j] = j;
	for (let i = 1; i <= x.length; i++)
		for (let j = 1; j <= y.length; j++)
			d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
	return d[x.length][y.length] <= 2;
}

function stripUndefined<T>(o: T): T {
	return JSON.parse(JSON.stringify(o));
}

const merged = out.filter((e) => e.archive && e.file.startsWith("contentful/")).length;
console.log(seriesOut.join("\n"));
console.log(`posts: ${postsOut.join(", ")}`);
console.log(
	`library: ${out.length} photos (${out.filter((e) => e.archive).length} archive, ${out.filter((e) => e.kind === "asset").length} blog assets); ` +
		`${merged} archive photos now use a higher-res Contentful source; ${review.length} borderline matches kept separate`,
);
