import Link from "next/link";
import { frameDate } from "@/components/chapter/Print.tsx";
import { Photo } from "@/components/photo/Photo.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { chaptersWith } from "@/lib/content.ts";
import { archiveYears, exifLine, getPhoto, toView } from "@/lib/photos.ts";
import { breadcrumbLd, graph, imageLd } from "@/lib/seo.ts";

/** A single archive frame: the print, its notes, and the frames either side. */
export function ArchivePhoto({ id }: { id: string }) {
	const photo = getPhoto(id);
	const years = archiveYears();
	const year = years.find((y) => y.photos.some((p) => p.id === id));
	if (!year) throw new Error(`archive photo ${id} has no year`);
	const at = year.photos.findIndex((p) => p.id === id);
	const all = years.toReversed().flatMap((y) => y.photos);
	const pos = all.findIndex((p) => p.id === id);
	const prev = all[pos - 1];
	const next = all[pos + 1];
	const ratio = (photo.width / photo.height).toFixed(4);
	const chapters = chaptersWith(id);
	const exif = exifLine(photo);
	const date = frameDate(photo.date);
	return (
		<article className="mx-auto grid max-w-[90rem] gap-8 px-4 pt-8 md:px-8">
			<JsonLd
				data={graph(
					imageLd(photo, `/archive/${id}`),
					breadcrumbLd([
						{ name: "Archive", path: "/archive" },
						{ name: String(year.year), path: `/archive/${year.year}` },
						{ name: date ?? id, path: `/archive/${id}` },
					]),
				)}
			/>
			<p className="label text-dim">
				<Link href="/archive" className="hover:text-ink">
					Archive
				</Link>{" "}
				·{" "}
				<Link href={`/archive/${year.year}`} className="hover:text-ink">
					{year.year}
				</Link>{" "}
				· <span className="text-safelight">Frame {String(at + 1).padStart(3, "0")}</span>
			</p>
			<figure className="mx-auto grid w-full gap-4" style={{ width: `min(100%, calc(80svh * ${ratio}))` }}>
				<Photo photo={toView(photo)} sizes="full" priority placeholder="blur" className="print h-auto w-full" />
				<figcaption className="grid gap-2">
					<h1 className="font-cond text-3xl md:text-4xl">{photo.title ?? date ?? "Untitled frame"}</h1>
					{photo.caption && <p className="max-w-2xl text-dim leading-relaxed">{photo.caption}</p>}
					{exif && <p className="label text-faint">{exif}</p>}
					{chapters.length > 0 && (
						<p className="label text-dim">
							Appears in{" "}
							{chapters.map((c, i) => (
								<span key={c.slug}>
									{i > 0 && ", "}
									<Link
										href={`/${c.slug}`}
										className="text-ink underline decoration-safelight underline-offset-4 hover:text-safelight"
									>
										{c.title}
									</Link>
								</span>
							))}
						</p>
					)}
				</figcaption>
			</figure>
			<nav aria-label="Neighbouring frames" className="label grid grid-cols-3 gap-4 border-rule border-t pt-5 text-dim">
				<span>
					{prev && (
						<Link href={`/archive/${prev.id}`} className="hover:text-safelight">
							← Previous
						</Link>
					)}
				</span>
				<Link href={`/archive/${year.year}`} className="text-center hover:text-safelight">
					{year.year} contact sheet
				</Link>
				<span className="text-right">
					{next && (
						<Link href={`/archive/${next.id}`} className="hover:text-safelight">
							Next →
						</Link>
					)}
				</span>
			</nav>
		</article>
	);
}
