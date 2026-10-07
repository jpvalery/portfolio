// Resizes every photo in content/photos/library.json once and writes the variants
// to .cache/cdn/p/{hash}/ (and uploads them to the public R2 bucket when
// credentials are configured). Rewrites content/photos/manifest.json.
//
// Re-running is cheap: a photo is only re-encoded when its source file or the
// pipeline settings change, and uploads skip keys that already exist.
//
// Usage: node scripts/photos/ingest.ts [--only <id-prefix>] [--force] [--no-upload] [--dry-run]

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import sharp from "sharp";
import { Manifest, type Photo } from "../../lib/schemas.ts";
import { archiveDate } from "./lib/ids.ts";
import { readLibrary } from "./lib/library.ts";
import { cdnDir, manifestPath, photosSrc } from "./lib/paths.ts";
import { processPhoto, SETTINGS, sha256File, variantHash, variantKeys } from "./lib/pipeline.ts";
import { IMMUTABLE, r2Bucket } from "./lib/r2.ts";

const { values: args } = parseArgs({
	options: {
		only: { type: "string" },
		force: { type: "boolean", default: false },
		"no-upload": { type: "boolean", default: false },
		"dry-run": { type: "boolean", default: false },
	},
});

const BIG_PIXELS = 50_000_000;
const workers = Math.max(1, Math.floor(os.availableParallelism() / 2));
sharp.concurrency(2);

const library = readLibrary().filter((e) => !args.only || e.id.startsWith(args.only));
const previous = fs.existsSync(manifestPath) ? Manifest.parse(JSON.parse(fs.readFileSync(manifestPath, "utf8"))) : null;
const prevById = new Map(previous?.photos.map((p) => [p.id, p]));
const bucket = args["no-upload"] ? null : r2Bucket(process.env.R2_PUBLIC_BUCKET);
if (!args["no-upload"] && !bucket) console.log("R2 credentials not set: writing variants locally only (.cache/cdn).");

const out = new Map<string, Photo>(previous ? previous.photos.map((p) => [p.id, p]) : []);
// Drop photos that left the library (only on a full run).
if (!args.only) for (const id of out.keys()) if (!library.some((e) => e.id === id)) out.delete(id);

let encoded = 0;
let reused = 0;
let uploaded = 0;
let bytesOut = 0;
const warnings: string[] = [];

function writeManifest() {
	if (args["dry-run"]) return;
	const manifest = Manifest.parse({
		version: 1,
		pipeline: SETTINGS,
		photos: [...out.values()].sort((a, b) => a.id.localeCompare(b.id)),
	});
	const tmp = `${manifestPath}.tmp`;
	fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
	// One photo per line keeps diffs readable.
	fs.writeFileSync(
		tmp,
		`{"version":1,"pipeline":${JSON.stringify(manifest.pipeline)},"photos":[\n${manifest.photos.map((p) => JSON.stringify(p)).join(",\n")}\n]}\n`,
	);
	fs.renameSync(tmp, manifestPath);
}

const localExists = (keys: string[]) => keys.every((k) => fs.existsSync(path.join(cdnDir, k)));

async function upload(keys: string[]) {
	if (!bucket) return;
	for (const key of keys) {
		if (await bucket.exists(key)) continue;
		const ext = path.extname(key);
		const type = ext === ".avif" ? "image/avif" : ext === ".webp" ? "image/webp" : "image/jpeg";
		await bucket.put(key, fs.readFileSync(path.join(cdnDir, key)), type, IMMUTABLE);
		uploaded++;
	}
}

async function handle(entry: ReturnType<typeof readLibrary>[number]) {
	const file = path.join(photosSrc, entry.file);
	const stat = fs.statSync(file);
	const prev = prevById.get(entry.id);
	const sameSource =
		prev && prev.source.file === entry.file && prev.source.bytes === stat.size && prev.source.mtimeMs === stat.mtimeMs;
	const sourceSha = sameSource ? prev.source.sha256 : sha256File(file);
	const hash = variantHash(sourceSha);

	let generated: Omit<Photo, "id" | "kind" | "archive" | "alt" | "caption" | "title" | "location">;
	if (!args.force && prev && prev.hash === hash && localExists(variantKeys(hash, prev.widths))) {
		reused++;
		generated = prev;
	} else {
		if (args["dry-run"]) {
			console.log(`would encode ${entry.id} (${entry.file})`);
			return;
		}
		const r = await processPhoto(file, hash);
		for (const v of r.variants) {
			const dest = path.join(cdnDir, v.key);
			fs.mkdirSync(path.dirname(dest), { recursive: true });
			fs.writeFileSync(dest, v.body);
			bytesOut += v.body.length;
			if (v.key.endsWith("/1600.avif") && v.body.length > 450 * 1024)
				warnings.push(`${entry.id}: 1600w AVIF is ${Math.round(v.body.length / 1024)} KB`);
		}
		encoded++;
		generated = {
			hash,
			width: r.width,
			height: r.height,
			widths: r.widths,
			color: r.color,
			lqip: r.lqip,
			date: r.date ?? (entry.archive ? archiveDate(entry.id) : null),
			exif: r.exif,
			source: {
				origin: entry.file.split("/")[0] as Photo["source"]["origin"],
				file: entry.file,
				sha256: sourceSha,
				bytes: stat.size,
				mtimeMs: stat.mtimeMs,
			},
		};
	}
	await upload(variantKeys(hash, generated.widths));
	const { id, kind, archive, alt, caption, title, location } = entry;
	out.set(id, { ...generated, id, kind, archive, alt, caption, title, location });
}

// Big sources are encoded one at a time so memory stays bounded.
const isBig = async (e: (typeof library)[number]) => {
	const m = await sharp(path.join(photosSrc, e.file)).metadata();
	return (m.width ?? 0) * (m.height ?? 0) > BIG_PIXELS;
};
const big: typeof library = [];
const normal: typeof library = [];
for (const e of library) ((await isBig(e)) ? big : normal).push(e);

let done = 0;
const total = library.length;
const started = Date.now();
const tick = () => {
	done++;
	if (done % 25 === 0 || done === total) {
		writeManifest();
		const s = (Date.now() - started) / 1000;
		process.stdout.write(
			`\r${done}/${total} · ${encoded} encoded, ${reused} unchanged, ${uploaded} uploaded · ${Math.round(s)}s   `,
		);
	}
};
process.on("SIGINT", () => {
	writeManifest();
	console.log("\nInterrupted; manifest saved. Re-run to continue.");
	process.exit(130);
});

const run = async (queue: typeof library, n: number) =>
	Promise.all(
		Array.from({ length: n }, async () => {
			for (let e = queue.shift(); e; e = queue.shift()) {
				await handle(e);
				tick();
			}
		}),
	);
await run(big, 1);
await run(normal, workers);
writeManifest();

console.log(
	`\n${encoded} encoded (${(bytesOut / 1024 ** 2).toFixed(0)} MB written), ${reused} unchanged, ${uploaded} uploaded.`,
);
if (warnings.length) console.log(`${warnings.length} large variants:\n  ${warnings.slice(0, 20).join("\n  ")}`);
