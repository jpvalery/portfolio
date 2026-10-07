import Link from "next/link";
import { Photo } from "@/components/photo/Photo.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { toView } from "@/lib/photos.ts";
import type { Photo as PhotoData } from "@/lib/schemas.ts";
import { breadcrumbLd, graph } from "@/lib/seo.ts";
import { Lightbox } from "./Lightbox.tsx";

const SHORT = new Intl.DateTimeFormat("en-CA", { day: "2-digit", month: "short", timeZone: "UTC" });

export function ContactSheet({ year, photos, years }: { year: number; photos: PhotoData[]; years: number[] }) {
	return (
		<>
			<JsonLd
				data={graph(
					breadcrumbLd([
						{ name: "Archive", path: "/archive" },
						{ name: String(year), path: `/archive/${year}` },
					]),
				)}
			/>
			<header className="mx-auto grid max-w-[90rem] gap-5 px-4 pt-10 pb-10 md:px-8 md:pt-16">
				<p className="label text-safelight">
					<Link href="/archive" className="hover:text-ink">
						Archive
					</Link>{" "}
					· Contact sheet
				</p>
				<h1 className="font-cond text-[clamp(4rem,14vw,11rem)]">{year}</h1>
				<p className="label text-dim">{photos.length} frames, in the order they were taken</p>
				<nav aria-label="Years" className="label flex flex-wrap gap-x-5 gap-y-2 pt-2 text-faint">
					{years.map((y) => (
						<Link
							key={y}
							href={`/archive/${y}`}
							aria-current={y === year ? "page" : undefined}
							className="hover:text-ink aria-[current=page]:text-safelight"
						>
							{y}
						</Link>
					))}
				</nav>
			</header>
			{/* Plain <a> tiles: hundreds of <Link>s would each prefetch their page. */}
			<ol
				id="sheet"
				className="mx-auto grid max-w-[90rem] grid-cols-2 gap-x-2 gap-y-5 px-4 sm:grid-cols-3 md:grid-cols-4 md:px-8 lg:grid-cols-6 2xl:grid-cols-8"
			>
				{photos.map((p, i) => {
					const v = toView(p);
					return (
						<li key={p.id} className="[contain-intrinsic-size:auto_12rem] [content-visibility:auto]">
							<a
								href={`/archive/${p.id}`}
								data-hash={v.hash}
								data-size={`${v.width}x${v.height}`}
								data-widths={v.widths.join(",")}
								data-date={p.date?.slice(0, 10) ?? ""}
								className="group grid gap-1.5"
							>
								<span className="relative block aspect-[3/2] bg-black/40">
									<Photo
										photo={v}
										sizes="tile"
										maxWidth={640}
										placeholder="none"
										className="absolute inset-0 h-full w-full object-contain brightness-90 transition group-hover:brightness-110"
									/>
								</span>
								<span className="label flex justify-between text-[0.65rem] text-faint group-hover:text-dim">
									<span className="text-safelight/80">{String(i + 1).padStart(3, "0")}</span>
									<span>{p.date ? SHORT.format(new Date(`${p.date.slice(0, 10)}T12:00:00Z`)) : ""}</span>
								</span>
							</a>
						</li>
					);
				})}
			</ol>
			<Lightbox sheetId="sheet" />
		</>
	);
}
