// Validates content/: schemas, photo references, slugs, and alt text coverage.
// Usage: node scripts/check/content.ts [--strict]   (--strict makes missing alt text an error)

import { RESERVED_SLUGS } from "../../lib/schemas.ts";

process.chdir(new URL("../..", import.meta.url).pathname);
const { allChapters, allPosts, biography } = await import("../../lib/content.ts");
const { getPhoto, isPortraitPhoto } = await import("../../lib/photos.ts");

const strict = process.argv.includes("--strict");
const errors: string[] = [];
const warnings: string[] = [];

const chapters = allChapters();
const posts = allPosts();
biography();

const slugs = new Set<string>();
for (const c of chapters) {
	if (slugs.has(c.slug)) errors.push(`duplicate slug ${c.slug}`);
	if (RESERVED_SLUGS.has(c.slug)) errors.push(`reserved slug ${c.slug}`);
	slugs.add(c.slug);
	const all = c.sections.flatMap((s) => s.photos);
	if (all.length !== new Set(all).size) warnings.push(`${c.slug}: a photo appears twice`);
	for (const id of c.photos) {
		const p = getPhoto(id);
		if (p.kind !== "photo") errors.push(`${c.slug}: ${id} is a blog asset, not a photo`);
	}
	if (isPortraitPhoto(getPhoto(c.cover)) && c.listed)
		warnings.push(`${c.slug}: portrait cover (fine, but piles look best with landscape covers)`);
}

const chapterPhotos = new Set(chapters.flatMap((c) => c.photos));
const missingAlt = [...chapterPhotos].filter((id) => !getPhoto(id).alt);
const msg = `${missingAlt.length} of ${chapterPhotos.size} chapter photos have no written alt text (a dated fallback is used)`;
if (missingAlt.length) (strict ? errors : warnings).push(msg);

for (const w of warnings) console.warn(`warning: ${w}`);
if (errors.length) {
	console.error(`content: ${errors.length} error(s)\n  ${errors.join("\n  ")}`);
	process.exit(1);
}
console.log(`content: ${chapters.length} chapters, ${posts.length} posts, ${chapterPhotos.size} chapter photos OK`);
