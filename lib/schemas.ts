import { z } from "zod";

// Contract between the photo pipeline (scripts/photos), the content import
// (scripts/import) and the site. Everything that reads content/ validates here.

/** Immutable photo id. Always contains a dash, so it never collides with a year route. */
export const PhotoId = z
	.string()
	.regex(/^[a-z0-9]+(?:-[a-z0-9]+)+$/, "photo ids are lowercase slugs containing at least one '-'");

export const Slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

/** Top-level paths that a series slug may never take. */
export const RESERVED_SLUGS = new Set([
	"archive",
	"blog",
	"biography",
	"about",
	"p",
	"_next",
	"robots.txt",
	"sitemap.xml",
	"favicon.ico",
	"icon.png",
	"apple-icon.png",
	"opengraph-image.jpg",
	"404",
]);

export const Exif = z
	.object({
		make: z.string(),
		model: z.string(),
		lens: z.string(),
		focalLength: z.number(),
		fNumber: z.number(),
		exposure: z.string(),
		iso: z.number(),
	})
	.partial();

export const Photo = z.object({
	id: PhotoId,
	/** `asset` = blog screenshots and similar: no photo page, never in the archive. */
	kind: z.enum(["photo", "asset"]),
	/** Shown in /archive grids and gets an /archive/[id] page. */
	archive: z.boolean(),
	/** Content hash of source + pipeline settings; CDN prefix `p/{hash}/`. */
	hash: z.string().regex(/^[0-9a-f]{16}$/),
	/** Oriented source dimensions. */
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	/** Generated widths, ascending. Each exists as `{w}.avif` and `{w}.webp`. */
	widths: z.array(z.number().int().positive()).min(1),
	color: z.string().regex(/^#[0-9a-f]{6}$/),
	lqip: z.string().startsWith("data:image/webp;base64,").max(600),
	date: z.string().nullable(),
	exif: Exif.nullable(),
	// Editorial fields: written by hand, never overwritten by ingest.
	alt: z.string().min(1).nullable(),
	caption: z.string().nullable(),
	title: z.string().nullable(),
	location: z.string().nullable(),
	source: z.object({
		origin: z.enum(["archive", "contentful", "local"]),
		/** Path relative to $PHOTOS_SRC. */
		file: z.string(),
		sha256: z.string().length(64),
		bytes: z.number().int(),
		mtimeMs: z.number(),
	}),
});
export type Photo = z.infer<typeof Photo>;

export const PipelineSettings = z.object({
	version: z.number().int(),
	widths: z.array(z.number().int()),
	quality: z.object({ avif: z.number(), webp: z.number(), og: z.number() }),
});
export type PipelineSettings = z.infer<typeof PipelineSettings>;

export const Manifest = z.object({
	version: z.literal(1),
	pipeline: PipelineSettings,
	photos: z.array(Photo),
});
export type Manifest = z.infer<typeof Manifest>;

export const ChapterFrontmatter = z.object({
	title: z.string().min(1),
	slug: Slug.refine((s) => !RESERVED_SLUGS.has(s), "slug is reserved"),
	/** Position in the book; chapter 1 is shown first. */
	chapter: z.number().int().positive(),
	/** Display string, e.g. "2015 & 2017" or "2019 – ongoing". */
	years: z.string(),
	yearStart: z.number().int(),
	yearEnd: z.number().int().nullable(),
	date: z.iso.date(),
	/** Shown with the title on the home pile and the chapter page; also the meta description. */
	description: z.string().min(1).max(160),
	summary: z.string().optional(),
	location: z.string().optional(),
	cover: PhotoId,
	/** The two prints piled under the cover on the home page. Defaults to the first two other photos. */
	pile: z.tuple([PhotoId, PhotoId]).optional(),
	/** false = reachable by URL but not on the home page. */
	listed: z.boolean().default(true),
	/** A collection gathers photos from other chapters (Americana, Featured Shots). */
	kind: z.enum(["chapter", "collection"]).default("chapter"),
	tags: z.array(z.string()).default([]),
	/** Prints in order. Consecutive portraits are paired automatically when rendered. */
	sections: z.array(z.object({ title: z.string().optional(), photos: z.array(PhotoId).min(1) })).min(1),
});
export type ChapterFrontmatter = z.infer<typeof ChapterFrontmatter>;

export const PostFrontmatter = z.object({
	title: z.string().min(1),
	slug: Slug,
	date: z.iso.date(),
	updated: z.iso.date().optional(),
	description: z.string().min(1).max(160),
	cover: PhotoId,
	tags: z.array(z.string()).default([]),
	draft: z.boolean().default(false),
});
export type PostFrontmatter = z.infer<typeof PostFrontmatter>;

export const PageFrontmatter = z.object({
	title: z.string().min(1),
	description: z.string().min(1).max(160),
	ogImage: PhotoId.optional(),
	noindex: z.boolean().default(false),
});
export type PageFrontmatter = z.infer<typeof PageFrontmatter>;

export const BiographyFrontmatter = PageFrontmatter.extend({
	press: z.array(z.string()),
	books: z.array(z.object({ title: z.string(), year: z.number().int() })),
	exhibitions: z.array(
		z.object({
			year: z.number().int(),
			title: z.string(),
			venue: z.string(),
			event: z.string().optional(),
		}),
	),
});
export type BiographyFrontmatter = z.infer<typeof BiographyFrontmatter>;
