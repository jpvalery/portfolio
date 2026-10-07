import Link from "next/link";
import { frameDate } from "@/components/chapter/Print.tsx";
import { Photo } from "@/components/photo/Photo.tsx";
import { allPosts } from "@/lib/content.ts";
import { toView } from "@/lib/photos.ts";
import { pageMetadata } from "@/lib/seo.ts";

export const metadata = pageMetadata({
	title: "Blog",
	description:
		"Occasional notes from Jp Valery on photography: restoring a Mamiya RB67, free resources and the making of this site.",
	path: "/blog",
});

export default function Blog() {
	return (
		<>
			<header className="mx-auto grid max-w-[90rem] gap-5 px-4 pt-10 pb-14 md:px-8 md:pt-16">
				<p className="label text-safelight">Notes</p>
				<h1 className="font-cond text-[clamp(3.4rem,12vw,10rem)]">Blog</h1>
				<p className="max-w-3xl text-ink text-xl leading-relaxed md:text-2xl">
					Occasional writing about photography and gear.
				</p>
			</header>
			<ol className="mx-auto grid max-w-[90rem] gap-10 px-4 md:px-8">
				{allPosts().map((p) => (
					<li key={p.slug}>
						<article className="group relative grid gap-6 border-rule border-t pt-8 sm:grid-cols-[12rem_minmax(0,1fr)]">
							<Photo photo={toView(p.cover)} sizes="thumb" maxWidth={640} className="print aspect-square w-48 object-cover" />
							<div className="grid content-start gap-3">
								<p className="label text-dim">{frameDate(p.date)}</p>
								<h2 className="font-cond text-4xl group-hover:text-safelight md:text-5xl">
									<Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
										{p.title}
									</Link>
								</h2>
								<p className="max-w-2xl text-dim leading-relaxed">{p.description}</p>
							</div>
						</article>
					</li>
				))}
			</ol>
		</>
	);
}
