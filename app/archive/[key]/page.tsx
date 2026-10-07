import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchivePhoto } from "@/components/archive/ArchivePhoto.tsx";
import { ContactSheet } from "@/components/archive/ContactSheet.tsx";
import { frameDate } from "@/components/chapter/Print.tsx";
import { archivePhotos, archiveYears, getPhoto, hasPhoto } from "@/lib/photos.ts";
import { pageMetadata } from "@/lib/seo.ts";

// One dynamic segment serves both kinds of archive page: /archive/2016 is a year's
// contact sheet, /archive/2016-05-07-3 is a single frame. Photo ids always contain
// a dash, so they can't collide with a year.
export const dynamicParams = false;

export function generateStaticParams() {
	return [...archiveYears().map((y) => ({ key: String(y.year) })), ...archivePhotos().map((p) => ({ key: p.id }))];
}

const isYear = (key: string) => /^\d{4}$/.test(key);

export async function generateMetadata({ params }: PageProps<"/archive/[key]">): Promise<Metadata> {
	const { key } = await params;
	if (isYear(key)) {
		const y = archiveYears().find((x) => String(x.year) === key);
		if (!y) return {};
		return pageMetadata({
			title: `${key} contact sheet`,
			description: `All ${y.photos.length} frames Jp Valery kept from ${key}, in the order they were taken.`,
			path: `/archive/${key}`,
			image: y.photos[Math.floor(y.photos.length / 2)],
		});
	}
	if (!hasPhoto(key)) return {};
	const p = getPhoto(key);
	const when = frameDate(p.date);
	return pageMetadata({
		title: p.title ?? `Frame from ${when ?? "the archive"}`,
		description:
			p.caption ??
			p.alt ??
			`A photograph by Jp Valery${when ? `, taken ${when}` : ""}, from the complete archive of contact sheets.`,
		path: `/archive/${key}`,
		image: p,
	});
}

export default async function ArchiveKey({ params }: PageProps<"/archive/[key]">) {
	const { key } = await params;
	if (isYear(key)) {
		const years = archiveYears();
		const y = years.find((x) => String(x.year) === key);
		if (!y) notFound();
		return <ContactSheet year={y.year} photos={y.photos} years={years.map((x) => x.year)} />;
	}
	if (!hasPhoto(key) || !getPhoto(key).archive) notFound();
	return <ArchivePhoto id={key} />;
}
