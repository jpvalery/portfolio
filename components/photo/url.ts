import { PHOTO_CDN } from "../../lib/site.ts";

// URL helpers for the pre-generated variants on the CDN. No server-only imports,
// so the archive lightbox can use them in the browser.

export type Format = "avif" | "webp";

export const variantUrl = (hash: string, width: number, format: Format) => `${PHOTO_CDN}/p/${hash}/${width}.${format}`;

export const srcSet = (hash: string, widths: number[], format: Format) =>
	widths.map((w) => `${variantUrl(hash, w, format)} ${w}w`).join(", ");

/** 1200px JPEG: the og:image, and the <img> fallback for browsers without AVIF/WebP. */
export const jpegUrl = (hash: string) => `${PHOTO_CDN}/p/${hash}/og.jpg`;
