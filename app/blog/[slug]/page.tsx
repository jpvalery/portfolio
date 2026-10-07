import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { frameDate } from "@/components/chapter/Print.tsx";
import { Markdown } from "@/components/markdown/Markdown.tsx";
import { Photo } from "@/components/photo/Photo.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { allPosts, getPost } from "@/lib/content.ts";
import { getPhoto, toView } from "@/lib/photos.ts";
import { breadcrumbLd, graph, pageMetadata, postLd } from "@/lib/seo.ts";

export const dynamicParams = false;

export function generateStaticParams() {
	return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
	const p = getPost((await params).slug);
	if (!p) return {};
	return pageMetadata({
		title: p.title,
		description: p.description,
		path: `/blog/${p.slug}`,
		image: getPhoto(p.cover),
		type: "article",
		publishedTime: p.date,
		modifiedTime: p.updated,
	});
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
	const p = getPost((await params).slug);
	if (!p) notFound();
	return (
		<article className="mx-auto grid max-w-3xl gap-8 px-4 pt-10 md:pt-16">
			<JsonLd
				data={graph(
					postLd(p),
					breadcrumbLd([
						{ name: "Blog", path: "/blog" },
						{ name: p.title, path: `/blog/${p.slug}` },
					]),
				)}
			/>
			<header className="grid gap-5">
				<p className="label text-safelight">{frameDate(p.date)}</p>
				<h1 className="font-cond text-[clamp(3rem,9vw,6.5rem)]">{p.title}</h1>
				<p className="text-ink text-xl leading-relaxed">{p.description}</p>
			</header>
			<Photo photo={toView(p.cover)} sizes="prose" priority placeholder="blur" className="print h-auto w-full" />
			<div className="prose prose-invert prose-darkroom md:prose-lg">
				<Markdown source={p.body} />
			</div>
		</article>
	);
}
