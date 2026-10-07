import crypto from "node:crypto";
import fs from "node:fs";
import exifr from "exifr";
import sharp from "sharp";
import type { PipelineSettings } from "../../../lib/schemas.ts";

/** Bump `version` whenever encoding changes in a way the settings below don't capture. */
export const SETTINGS: PipelineSettings = {
	version: 1,
	widths: [640, 1080, 1600, 2400],
	quality: { avif: 55, webp: 78, og: 80 },
};
const AVIF_EFFORT = 4;
const OG_WIDTH = 1200;

export type Variant = { key: string; body: Buffer; contentType: string };

export function sha256File(file: string): string {
	return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

/** Variant prefix: changes when the source or the pipeline settings change. */
export function variantHash(sourceSha: string): string {
	return crypto
		.createHash("sha256")
		.update(`${sourceSha}:${JSON.stringify(SETTINGS)}`)
		.digest("hex")
		.slice(0, 16);
}

/** Widths to generate for a source this wide: the standard steps that fit, plus the source width as the top step. */
export function widthsFor(sourceWidth: number): number[] {
	const fit = SETTINGS.widths.filter((w) => w <= sourceWidth);
	const top = Math.min(sourceWidth, SETTINGS.widths.at(-1)!);
	if (!fit.includes(top) && top > (fit.at(-1) ?? 0)) fit.push(top);
	return fit.length ? fit : [sourceWidth];
}

export const variantKeys = (hash: string, widths: number[]) => [
	...widths.flatMap((w) => [`p/${hash}/${w}.avif`, `p/${hash}/${w}.webp`]),
	`p/${hash}/og.jpg`,
];

type Exif = {
	make?: string;
	model?: string;
	lens?: string;
	focalLength?: number;
	fNumber?: number;
	exposure?: string;
	iso?: number;
};

async function readExif(file: string): Promise<{ exif: Exif | null; date: string | null }> {
	const t = await exifr
		.parse(file, ["Make", "Model", "LensModel", "FocalLength", "FNumber", "ExposureTime", "ISO", "DateTimeOriginal"])
		.catch(() => null);
	if (!t) return { exif: null, date: null };
	const exif: Exif = {};
	if (t.Make) exif.make = String(t.Make).trim();
	if (t.Model) exif.model = String(t.Model).trim();
	if (t.LensModel) exif.lens = String(t.LensModel).trim();
	if (t.FocalLength) exif.focalLength = Math.round(t.FocalLength * 10) / 10;
	if (t.FNumber) exif.fNumber = Math.round(t.FNumber * 10) / 10;
	if (t.ExposureTime) exif.exposure = t.ExposureTime >= 1 ? `${t.ExposureTime}s` : `1/${Math.round(1 / t.ExposureTime)}`;
	if (t.ISO) exif.iso = t.ISO;
	// exifr returns a Date built from the camera's local time; keep it as local wall time.
	const d: Date | undefined = t.DateTimeOriginal instanceof Date ? t.DateTimeOriginal : undefined;
	const date =
		d && !Number.isNaN(d.valueOf())
			? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 19)
			: null;
	return { exif: Object.keys(exif).length ? exif : null, date };
}

export async function processPhoto(file: string, hash: string) {
	const input = sharp(file, { failOn: "error", limitInputPixels: 400_000_000 }).rotate().toColourspace("srgb");
	const meta = await input.metadata();
	// metadata() reports stored dimensions; EXIF orientations 5–8 are rotated a quarter turn.
	const turned = (meta.orientation ?? 1) >= 5;
	const width = turned ? meta.height! : meta.width!;
	const height = turned ? meta.width! : meta.height!;
	const widths = widthsFor(width);
	const variants: Variant[] = [];
	for (const w of widths) {
		const resized = input.clone().resize({ width: w, withoutEnlargement: true });
		variants.push({
			key: `p/${hash}/${w}.avif`,
			body: await resized.clone().avif({ quality: SETTINGS.quality.avif, effort: AVIF_EFFORT }).toBuffer(),
			contentType: "image/avif",
		});
		variants.push({
			key: `p/${hash}/${w}.webp`,
			body: await resized.clone().webp({ quality: SETTINGS.quality.webp }).toBuffer(),
			contentType: "image/webp",
		});
	}
	variants.push({
		key: `p/${hash}/og.jpg`,
		body: await input
			.clone()
			.resize({ width: Math.min(OG_WIDTH, width) })
			.jpeg({ quality: SETTINGS.quality.og, mozjpeg: true })
			.toBuffer(),
		contentType: "image/jpeg",
	});
	const lqipBuf = await input.clone().resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
	const { dominant } = await input.clone().resize({ width: 64 }).stats();
	const color = `#${[dominant.r, dominant.g, dominant.b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
	const { exif, date } = await readExif(file);
	return {
		width,
		height,
		widths,
		variants,
		color,
		lqip: `data:image/webp;base64,${lqipBuf.toString("base64")}`,
		exif,
		date,
	};
}
