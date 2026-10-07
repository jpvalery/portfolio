import fs from "node:fs";
import path from "node:path";
import { Manifest, type Photo } from "./schemas.ts";

// Build-time access to content/photos/manifest.json. Uses fs, so it can never end up
// in a client bundle; client components receive PhotoView objects instead.

export type PhotoView = Pick<Photo, "id" | "hash" | "width" | "height" | "widths" | "color" | "lqip"> & { alt: string };

let byId: Map<string, Photo> | undefined;

function load(): Map<string, Photo> {
	if (!byId) {
		const file = path.join(process.cwd(), "content/photos/manifest.json");
		const manifest = Manifest.parse(JSON.parse(fs.readFileSync(file, "utf8")));
		byId = new Map(manifest.photos.map((p) => [p.id, p]));
	}
	return byId;
}

export function getPhoto(id: string): Photo {
	const photo = load().get(id);
	if (!photo) throw new Error(`Unknown photo id "${id}". Run pnpm photos:ingest, or check the id in content/.`);
	return photo;
}

export const hasPhoto = (id: string) => load().has(id);

const MONTH = new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric", timeZone: "UTC" });

/** Written alt text, or a factual fallback until one is written. */
export function altFor(p: Photo): string {
	if (p.alt) return p.alt;
	const when = p.date ? ` in ${MONTH.format(new Date(`${p.date.slice(0, 10)}T12:00:00Z`))}` : "";
	return `Photograph by Jp Valery${when}${p.location ? `, ${p.location}` : ""}`;
}

export function toView(p: Photo | string): PhotoView {
	const photo = typeof p === "string" ? getPhoto(p) : p;
	const { id, hash, width, height, widths, color, lqip } = photo;
	return { id, hash, width, height, widths, color, lqip, alt: altFor(photo) };
}

/** Archive photos in shooting order. */
export function archivePhotos(): Photo[] {
	return [...load().values()]
		.filter((p) => p.archive)
		.sort((a, b) => (a.date ?? a.id).localeCompare(b.date ?? b.id) || a.id.localeCompare(b.id));
}

export function archiveYears(): { year: number; photos: Photo[] }[] {
	const years = new Map<number, Photo[]>();
	for (const p of archivePhotos()) {
		const y = Number((p.date ?? p.id).slice(0, 4));
		years.set(y, [...(years.get(y) ?? []), p]);
	}
	return [...years].sort((a, b) => b[0] - a[0]).map(([year, photos]) => ({ year, photos }));
}

export const isPortraitPhoto = (p: { width: number; height: number }) => p.height > p.width * 1.05;

/** "Fujifilm X-T2 · 23 mm · f/8 · 1/250 · ISO 200", or null when the file carried no EXIF. */
export function exifLine(p: Photo): string | null {
	const e = p.exif;
	if (!e) return null;
	const camera = [e.make, e.model]
		.filter(Boolean)
		.join(" ")
		.replace(/^(\w+) \1 /i, "$1 ");
	const parts = [
		camera,
		e.focalLength ? `${e.focalLength} mm` : null,
		e.fNumber ? `f/${e.fNumber}` : null,
		e.exposure,
		e.iso ? `ISO ${e.iso}` : null,
	].filter(Boolean);
	return parts.length ? parts.join(" · ") : null;
}
