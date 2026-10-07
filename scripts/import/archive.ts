// One-time archive import.
// 1. Extracts the 1,175 originals from the archive repo's git history (they were
//    committed there before the 2022 move to Cloudinary) into $PHOTOS_SRC/archive.
// 2. Builds content/redirects/archive-legacy.json (old /p/N → photo id) from the
//    live-site snapshot taken before the migration.
//
// Usage: node scripts/import/archive.ts

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { archiveIdFromFilename, archiveIdFromPublicId } from "../photos/lib/ids.ts";
import { photosSrc, repoRoot } from "../photos/lib/paths.ts";

const ARCHIVE_REPO = process.env.ARCHIVE_REPO ?? path.resolve(repoRoot, "../archive.jpvalery.photo");
const ARCHIVE_COMMIT = "9fd4673^"; // last commit before the Cloudinary migration
const EXPECTED = 1175;

const dest = path.join(photosSrc, "archive");
fs.mkdirSync(dest, { recursive: true });

const jpgs = () => fs.readdirSync(dest).filter((f) => /\.jpe?g$/i.test(f));

if (jpgs().length < EXPECTED) {
	console.log(`Extracting originals from ${ARCHIVE_REPO}@${ARCHIVE_COMMIT} into ${dest}…`);
	const tar = execFileSync("git", ["-C", ARCHIVE_REPO, "archive", "--format=tar", ARCHIVE_COMMIT, "photos/original"], {
		maxBuffer: 4 * 1024 ** 3,
	});
	execFileSync("tar", ["-x", "-C", dest, "--strip-components=2"], { input: tar });
}

const files = jpgs();
if (files.length !== EXPECTED) throw new Error(`expected ${EXPECTED} archive originals, found ${files.length}`);

const idByFile = new Map(files.map((f) => [f, archiveIdFromFilename(f)]));
const ids = new Set(idByFile.values());
if (ids.size !== files.length) throw new Error("archive ids collide");

const snapshotPath = path.join(repoRoot, ".migration/snapshots/archive-next-data.json");
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const images: { id: number; public_id: string }[] = snapshot.props.pageProps.images;
if (images.length !== EXPECTED) throw new Error(`snapshot has ${images.length} images, expected ${EXPECTED}`);

const legacy: Record<string, string> = {};
for (const img of images) {
	const id = archiveIdFromPublicId(img.public_id);
	if (!ids.has(id)) throw new Error(`snapshot photo ${img.id} (${img.public_id}) has no original on disk`);
	legacy[String(img.id)] = id;
}
const mapped = new Set(Object.values(legacy));
if (mapped.size !== EXPECTED) throw new Error("legacy map is not one-to-one");

const out = path.join(repoRoot, "content/redirects/archive-legacy.json");
fs.writeFileSync(out, `${JSON.stringify(legacy, null, "\t")}\n`);

const bytes = files.reduce((n, f) => n + fs.statSync(path.join(dest, f)).size, 0);
console.log(`${files.length} originals in ${dest} (${(bytes / 1024 ** 3).toFixed(2)} GB)`);
console.log(`Wrote ${Object.keys(legacy).length} legacy redirects to ${path.relative(repoRoot, out)}`);
