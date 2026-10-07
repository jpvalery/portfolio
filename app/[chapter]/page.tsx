import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapterLabel, chapterMeta } from "@/components/chapter/meta.ts";
import { Print } from "@/components/chapter/Print.tsx";
import { Markdown } from "@/components/markdown/Markdown.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { allChapters, getChapter, listedChapters } from "@/lib/content.ts";
import { getPhoto } from "@/lib/photos.ts";
import { printRows } from "@/lib/prints.ts";
import { breadcrumbLd, chapterLd, graph, pageMetadata } from "@/lib/seo.ts";

export const dynamicParams = false;

export function generateStaticParams() {
	return allChapters().map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[chapter]">): Promise<Metadata> {
	const c = getChapter((await params).chapter);
	if (!c) return {};
	return pageMetadata({ title: c.title, description: c.description, path: `/${c.slug}`, image: getPhoto(c.cover) });
}

export default async function ChapterPage({ params }: PageProps<"/[chapter]">) {
	const c = getChapter((await params).chapter);
	if (!c) notFound();
	const listed = listedChapters();
	const at = listed.findIndex((x) => x.slug === c.slug);
	const prev = at > 0 ? listed[at - 1] : undefined;
	const next = at >= 0 && at < listed.length - 1 ? listed[at + 1] : undefined;
	let frame = 0;
	return (
		<article>
			<JsonLd
				data={graph(
					chapterLd(c),
					breadcrumbLd([
						{ name: "Chapters", path: "/" },
						{ name: c.title, path: `/${c.slug}` },
					]),
				)}
			/>
			<header className="mx-auto grid max-w-[90rem] gap-5 px-4 pt-10 pb-14 md:px-8 md:pt-16 md:pb-20">
				<p className="label text-safelight">
					{c.kind === "collection" ? "Collection" : c.listed ? chapterLabel(c) : "Chapter"}
				</p>
				<h1 className="font-cond text-[clamp(3.4rem,12vw,10rem)]">{c.title}</h1>
				<p className="label text-dim">{chapterMeta(c)}</p>
				<p className="max-w-3xl text-ink text-xl leading-relaxed md:text-2xl">{c.description}</p>
				{c.body && (
					<div className="prose prose-invert prose-darkroom md:prose-lg max-w-3xl">
						<Markdown source={c.body} />
					</div>
				)}
			</header>

			{c.sections.map((section, s) => (
				<section
					key={section.title ?? s}
					aria-label={section.title}
					className="mx-auto grid max-w-[90rem] gap-20 px-4 pb-20 md:gap-28 md:px-8"
				>
					{section.title && <h2 className="label border-rule border-t pt-6 text-safelight">{section.title}</h2>}
					{printRows(section.photos.map((id) => getPhoto(id))).map((row) =>
						row.kind === "pair" ? (
							<div
								key={row.photos[0].id}
								className="mx-auto grid w-full max-w-[68rem] items-end gap-8 md:grid-cols-2 md:gap-10"
							>
								<Print id={row.photos[0].id} frame={++frame} layout="pair" />
								<Print id={row.photos[1].id} frame={++frame} layout="pair" />
							</div>
						) : (
							<Print key={row.photo.id} id={row.photo.id} frame={++frame} layout="single" />
						),
					)}
				</section>
			))}

			<nav
				aria-label="More chapters"
				className="label mx-auto grid max-w-[90rem] gap-4 border-rule border-t px-4 pt-6 md:grid-cols-3 md:px-8"
			>
				<span>
					{prev && (
						<Link href={`/${prev.slug}`} className="hover:text-safelight">
							← {prev.title}
						</Link>
					)}
				</span>
				<Link href="/" className="text-dim hover:text-safelight md:text-center">
					All chapters
				</Link>
				<span className="md:text-right">
					{next && (
						<Link href={`/${next.slug}`} className="hover:text-safelight">
							{next.title} →
						</Link>
					)}
				</span>
			</nav>
		</article>
	);
}
