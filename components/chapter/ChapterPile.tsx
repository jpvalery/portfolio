import Link from "next/link";
import type { CSSProperties } from "react";
import { Photo } from "@/components/photo/Photo.tsx";
import type { Chapter } from "@/lib/content.ts";
import { toView } from "@/lib/photos.ts";
import { pileRotations } from "@/lib/pile.ts";
import { chapterLabel, chapterMeta } from "./meta.ts";

export function ChapterPile({ chapter, priority }: { chapter: Chapter; priority?: boolean }) {
	const [a, b] = chapter.pile ?? chapter.photos.filter((id) => id !== chapter.cover);
	const { r0, r1, r2 } = pileRotations(chapter.slug);
	const vars = { "--r0": `${r0}deg`, "--r1": `${r1}deg`, "--r2": `${r2}deg` } as CSSProperties;
	return (
		// Five rows on a subgrid: pile, chapter number, title, metadata, description. Cards in
		// the same row share these tracks, so titles and descriptions line up across a row.
		<article className="group relative row-span-5 grid min-w-0 grid-rows-subgrid">
			<div className="pile mb-3" style={vars}>
				{b && <Photo photo={toView(b)} sizes="pile" maxWidth={1080} decorative className="print p2" />}
				{a && <Photo photo={toView(a)} sizes="pile" maxWidth={1080} decorative className="print p1" />}
				<Photo photo={toView(chapter.cover)} sizes="pile" maxWidth={1600} priority={priority} className="print p0" />
			</div>
			<p className="label self-end text-safelight">{chapterLabel(chapter)}</p>
			<h2 className="font-cond text-4xl md:text-5xl">
				<Link href={`/${chapter.slug}`} className="after:absolute after:inset-0">
					{chapter.title}
				</Link>
			</h2>
			<p className="label text-dim">{chapterMeta(chapter)}</p>
			<p className="max-w-[34rem] pb-16 text-dim leading-relaxed md:pb-20">{chapter.description}</p>
		</article>
	);
}
