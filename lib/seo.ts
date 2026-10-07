import type { Metadata } from "next";
import { jpegUrl } from "../components/photo/url.ts";
import type { Chapter, Post } from "./content.ts";
import { altFor, getPhoto } from "./photos.ts";
import type { Photo } from "./schemas.ts";
import { SITE } from "./site.ts";

type PageMeta = {
	/** Page title; the layout appends " · Jp Valery". Omit on the home page. */
	title?: string;
	description: string;
	/** Path of this page, e.g. "/archive/2016". Becomes the canonical and og:url. */
	path: string;
	image?: Photo;
	type?: "website" | "article";
	publishedTime?: string;
	modifiedTime?: string;
	noindex?: boolean;
};

const ogImage = (p: Photo) => {
	const width = Math.min(1200, p.width);
	return { url: jpegUrl(p.hash), width, height: Math.round((width * p.height) / p.width), alt: altFor(p) };
};

/** Social image for pages without a photo of their own: the An American Road Trip cover. */
const DEFAULT_OG_PHOTO = "2016-05-10";

/** Per-page metadata. Every page sets its own canonical; the layout never does. */
export function pageMetadata(m: PageMeta): Metadata {
	const images = [ogImage(m.image ?? getPhoto(DEFAULT_OG_PHOTO))];
	return {
		...(m.title ? { title: m.title } : {}),
		description: m.description,
		alternates: { canonical: m.path },
		openGraph: {
			title: m.title ?? SITE.title,
			description: m.description,
			url: m.path,
			type: m.type ?? "website",
			siteName: SITE.name,
			locale: SITE.locale,
			images,
			...(m.publishedTime ? { publishedTime: m.publishedTime } : {}),
			...(m.modifiedTime ? { modifiedTime: m.modifiedTime } : {}),
		},
		twitter: {
			card: "summary_large_image",
			site: SITE.twitter,
			creator: SITE.twitter,
			title: m.title ?? SITE.title,
			description: m.description,
			images: images.map((i) => i.url),
		},
		...(m.noindex ? { robots: { index: false, follow: true } } : {}),
	};
}

// ---------- JSON-LD ----------

const abs = (path: string) => new URL(path, SITE.url).toString();

export const PERSON_ID = `${SITE.url}/#person`;

export function personLd() {
	return {
		"@type": "Person",
		"@id": PERSON_ID,
		name: SITE.name,
		url: SITE.url,
		jobTitle: "Photographer",
		homeLocation: { "@type": "Place", name: "Montréal, Québec, Canada" },
		sameAs: [SITE.links.instagram, SITE.links.unsplash, "https://jpvalery.me"],
	};
}

export function websiteLd() {
	return {
		"@type": "WebSite",
		"@id": `${SITE.url}/#website`,
		url: SITE.url,
		name: SITE.name,
		publisher: { "@id": PERSON_ID },
	};
}

export function imageLd(p: Photo, pagePath?: string) {
	return {
		"@type": "ImageObject",
		contentUrl: jpegUrl(p.hash),
		...(pagePath ? { url: abs(pagePath) } : {}),
		width: p.width,
		height: p.height,
		caption: p.caption ?? altFor(p),
		...(p.date ? { dateCreated: p.date } : {}),
		creator: { "@id": PERSON_ID },
		creditText: SITE.name,
		copyrightNotice: `© ${SITE.name}`,
		acquireLicensePage: SITE.contact,
	};
}

export function chapterLd(c: Chapter) {
	return {
		"@type": "ImageGallery",
		name: c.title,
		description: c.description,
		url: abs(`/${c.slug}`),
		author: { "@id": PERSON_ID },
		image: c.photos.map((id) => imageLd(getPhoto(id))),
	};
}

export function postLd(p: Post) {
	return {
		"@type": "BlogPosting",
		headline: p.title,
		description: p.description,
		url: abs(`/blog/${p.slug}`),
		datePublished: p.date,
		...(p.updated ? { dateModified: p.updated } : {}),
		author: { "@id": PERSON_ID },
		image: imageLd(getPhoto(p.cover)),
	};
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
	};
}

export function graph(...nodes: object[]) {
	return { "@context": "https://schema.org", "@graph": nodes };
}
