import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { PhotoId } from "../../../lib/schemas.ts";
import { repoRoot } from "./paths.ts";

// content/photos/library.json is the hand-maintained list of photos: which source
// file each id comes from, plus editorial fields (alt, caption, title, location).
// content/photos/manifest.json is generated from it by `photos:ingest`.

export const LibraryEntry = z.object({
	id: PhotoId,
	/** Path relative to $PHOTOS_SRC. */
	file: z.string(),
	kind: z.enum(["photo", "asset"]),
	archive: z.boolean(),
	alt: z.string().min(1).nullable(),
	caption: z.string().nullable(),
	title: z.string().nullable(),
	location: z.string().nullable(),
});
export type LibraryEntry = z.infer<typeof LibraryEntry>;

export const libraryPath = path.join(repoRoot, "content/photos/library.json");

export function readLibrary(): LibraryEntry[] {
	const entries = z.array(LibraryEntry).parse(JSON.parse(fs.readFileSync(libraryPath, "utf8")));
	const seen = new Set<string>();
	for (const e of entries) {
		if (seen.has(e.id)) throw new Error(`duplicate photo id in library: ${e.id}`);
		seen.add(e.id);
	}
	return entries;
}

export function writeLibrary(entries: LibraryEntry[]): void {
	const sorted = [...entries].sort((a, b) => a.id.localeCompare(b.id));
	const parsed = z.array(LibraryEntry).parse(sorted);
	fs.mkdirSync(path.dirname(libraryPath), { recursive: true });
	// One entry per line keeps diffs readable when alt text is edited by hand.
	fs.writeFileSync(libraryPath, `[\n${parsed.map((e) => `\t${JSON.stringify(e)}`).join(",\n")}\n]\n`);
}
