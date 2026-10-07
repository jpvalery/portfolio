import Link from "next/link";
import { Photo } from "@/components/photo/Photo.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { archivePhotos, archiveYears, toView } from "@/lib/photos.ts";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo.ts";

export const metadata = pageMetadata({
	title: "Archive",
	description:
		"Contact sheets of every frame Jp Valery kept from 2015 to 2021, in the order they were taken: road trips, cities and quiet places across North America.",
	path: "/archive",
});

/** Evenly spaced frames from a year, for its contact strip. */
const sample = <T,>(items: T[], n: number) =>
	items.length <= n ? items : Array.from({ length: n }, (_, i) => items[Math.floor((i * items.length) / n)]);

export default function Archive() {
	const years = archiveYears();
	const total = archivePhotos().length;
	return (
		<>
			<JsonLd data={graph(breadcrumbLd([{ name: "Archive", path: "/archive" }]))} />
			<header className="mx-auto grid max-w-[90rem] gap-5 px-4 pt-10 pb-14 md:px-8 md:pt-16">
				<p className="label text-safelight">The archive</p>
				<h1 className="font-cond text-[clamp(3.4rem,12vw,10rem)]">Contact sheets</h1>
				<p className="label text-dim">
					{total.toLocaleString("en-CA")} frames · {years.at(-1)?.year}–{years[0]?.year}
				</p>
				<p className="max-w-3xl text-ink text-xl leading-relaxed md:text-2xl">
					Every frame I kept, unfiltered and in the order I took them. The chapters are edits; this is the whole roll.
				</p>
			</header>
			<ol className="mx-auto grid max-w-[90rem] gap-14 px-4 md:px-8">
				{years.map(({ year, photos }) => (
					<li key={year}>
						<Link
							href={`/archive/${year}`}
							className="group grid gap-5 border-rule border-t pt-6 md:grid-cols-[14rem_minmax(0,1fr)]"
						>
							<div className="grid content-start gap-2">
								<h2 className="font-cond text-7xl group-hover:text-safelight">{year}</h2>
								<p className="label text-dim">{photos.length} frames →</p>
							</div>
							<div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-8" aria-hidden="true">
								{sample(photos, 8).map((p, i) => (
									<Photo
										key={p.id}
										photo={toView(p)}
										sizes="tile"
										maxWidth={640}
										decorative
										className={`aspect-[3/2] w-full object-cover opacity-80 transition-opacity group-hover:opacity-100 ${i >= 4 ? "max-sm:hidden" : ""} ${i >= 6 ? "max-lg:hidden" : ""}`}
									/>
								))}
							</div>
						</Link>
					</li>
				))}
			</ol>
		</>
	);
}
