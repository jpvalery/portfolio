import { Markdown } from "@/components/markdown/Markdown.tsx";
import { AsSeenOn } from "@/components/press/AsSeenOn.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { biography } from "@/lib/content.ts";
import { getPhoto } from "@/lib/photos.ts";
import { graph, PERSON_ID, pageMetadata, personLd } from "@/lib/seo.ts";
import { SITE } from "@/lib/site.ts";

const bio = biography();

export const metadata = pageMetadata({
	title: bio.title,
	description: bio.description,
	path: "/biography",
	image: bio.ogImage ? getPhoto(bio.ogImage) : undefined,
});

export default function Biography() {
	return (
		<article className="mx-auto grid max-w-[90rem] gap-14 px-4 pt-10 md:px-8 md:pt-16">
			<JsonLd
				data={graph({ "@type": "ProfilePage", mainEntity: { "@id": PERSON_ID }, url: `${SITE.url}/biography` }, personLd())}
			/>
			<header className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
				<div className="grid gap-5">
					<p className="label text-safelight">Montréal, Québec</p>
					<h1 className="font-cond text-[clamp(3.4rem,12vw,10rem)]">{bio.title}</h1>
				</div>
				<img
					src="/jp-valery.webp"
					width={240}
					height={240}
					alt="Portrait of Jp Valery"
					className="print w-40 rotate-2 md:w-60"
				/>
			</header>
			<AsSeenOn names={bio.press} />
			<div className="grid gap-14 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
				<div className="prose prose-invert prose-darkroom md:prose-lg">
					<Markdown source={bio.body} />
				</div>
				<aside className="grid content-start gap-10">
					<section className="grid gap-3">
						<h2 className="label text-safelight">Books</h2>
						<ul className="grid gap-2">
							{bio.books.map((b) => (
								<li key={b.title} className="flex justify-between gap-4 border-rule border-b pb-2">
									<span>{b.title}</span>
									<span className="label text-faint">{b.year}</span>
								</li>
							))}
						</ul>
					</section>
					<section className="grid gap-3">
						<h2 className="label text-safelight">Exhibitions</h2>
						<ul className="grid gap-2">
							{bio.exhibitions.map((x) => (
								<li key={`${x.year}-${x.title}`} className="grid gap-1 border-rule border-b pb-2">
									<span>
										{x.title}
										<span className="label ml-3 text-faint">{x.year}</span>
									</span>
									<span className="text-dim text-sm">
										{x.venue}
										{x.event ? `, ${x.event}` : ""}
									</span>
								</li>
							))}
						</ul>
					</section>
				</aside>
			</div>
		</article>
	);
}
