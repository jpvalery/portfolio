import type { MetadataRoute } from "next";
import { jpegUrl } from "@/components/photo/url.ts";
import { allChapters, allPosts } from "@/lib/content.ts";
import { archivePhotos, archiveYears, getPhoto } from "@/lib/photos.ts";
import { SITE } from "@/lib/site.ts";

export const dynamic = "force-static";

const url = (path: string) => new URL(path, SITE.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: url("/"), priority: 1 },
		...allChapters().map((c) => ({
			url: url(`/${c.slug}`),
			lastModified: c.date,
			priority: c.listed ? 0.9 : 0.5,
			images: c.photos.map((id) => jpegUrl(getPhoto(id).hash)),
		})),
		{ url: url("/biography"), priority: 0.8 },
		{ url: url("/blog"), priority: 0.5 },
		...allPosts().map((p) => ({
			url: url(`/blog/${p.slug}`),
			lastModified: p.updated ?? p.date,
			priority: 0.5,
			images: [jpegUrl(getPhoto(p.cover).hash)],
		})),
		{ url: url("/archive"), priority: 0.6 },
		...archiveYears().map((y) => ({ url: url(`/archive/${y.year}`), priority: 0.5 })),
		...archivePhotos().map((p) => ({ url: url(`/archive/${p.id}`), priority: 0.3, images: [jpegUrl(p.hash)] })),
	];
}
