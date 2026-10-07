import Link from "next/link";
import { ChapterPile } from "@/components/chapter/ChapterPile.tsx";
import { Photo } from "@/components/photo/Photo.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { listedChapters } from "@/lib/content.ts";
import { archivePhotos, archiveYears, toView } from "@/lib/photos.ts";
import { graph, pageMetadata, personLd, websiteLd } from "@/lib/seo.ts";
import { SITE } from "@/lib/site.ts";

export const metadata = pageMetadata({ description: SITE.description, path: "/" });

export default function Home() {
	const chapters = listedChapters();
	const years = archiveYears();
	const archive = archivePhotos();
	const strip = years.map((y) => y.photos[Math.floor(y.photos.length / 2)]).slice(0, 6);
	return (
		<>
			<JsonLd data={graph(personLd(), websiteLd())} />
			<section className="mx-auto grid max-w-[90rem] gap-8 px-4 pt-10 pb-16 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end md:px-8 md:pt-16 md:pb-24">
				<h1 className="font-cond text-[clamp(3.2rem,11vw,9.5rem)]">
					There’s a lot of beauty in <span className="text-safelight">ordinary things</span>
				</h1>
				<div className="grid max-w-md gap-4 text-dim leading-relaxed md:pb-3">
					<p>
						I’m Jp Valery, a self-taught photographer from Montréal. I document places and the people in them, mostly across
						North America. Each chapter below is one body of work.
					</p>
					<p className="label flex flex-wrap gap-x-6 gap-y-2 text-ink">
						<Link href="/biography" className="underline decoration-safelight underline-offset-[6px] hover:text-safelight">
							About me
						</Link>
						<a href={SITE.contact} className="underline decoration-safelight underline-offset-[6px] hover:text-safelight">
							Get in touch
						</a>
					</p>
				</div>
			</section>

			<section aria-label="Chapters" className="mx-auto max-w-[90rem] px-4 md:px-8">
				<ol className="grid gap-x-12 gap-y-3 md:grid-cols-2 xl:grid-cols-3">
					{chapters.map((c, i) => (
						<li key={c.slug} className="row-span-5 grid min-w-0 grid-rows-subgrid">
							<ChapterPile chapter={c} priority={i === 0} />
						</li>
					))}
				</ol>
			</section>

			<section className="mx-auto mt-28 max-w-[90rem] px-4 md:px-8">
				<Link
					href="/archive"
					className="group grid gap-6 border-rule border-t pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-center"
				>
					<div className="grid gap-3">
						<p className="label text-safelight">The archive</p>
						<h2 className="font-cond text-5xl group-hover:text-safelight md:text-6xl">Contact sheets</h2>
						<p className="label text-dim">
							{archive.length.toLocaleString("en-CA")} frames · {years.at(-1)?.year}–{years[0]?.year}
						</p>
					</div>
					<div className="grid grid-cols-3 gap-2 md:grid-cols-6" aria-hidden="true">
						{strip.map((p) => (
							<Photo
								key={p.id}
								photo={toView(p)}
								sizes="tile"
								maxWidth={640}
								decorative
								className="aspect-[3/2] w-full object-cover"
							/>
						))}
					</div>
				</Link>
			</section>
		</>
	);
}
