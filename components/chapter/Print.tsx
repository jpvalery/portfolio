import Link from "next/link";
import { Photo } from "@/components/photo/Photo.tsx";
import { exifLine, getPhoto, isPortraitPhoto, toView } from "@/lib/photos.ts";

const DAY = new Intl.DateTimeFormat("en-CA", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function frameDate(date: string | null): string | null {
	return date ? DAY.format(new Date(`${date.slice(0, 10)}T12:00:00Z`)) : null;
}

/**
 * One print on a chapter page, with film-edge notes underneath: frame number,
 * date and camera settings when the file has them.
 */
export function Print({ id, frame, layout }: { id: string; frame: number; layout: "single" | "pair" }) {
	const photo = getPhoto(id);
	const tall = isPortraitPhoto(photo);
	const ratio = photo.width / photo.height;
	// A lone print is capped by the viewport height so the whole frame is always visible.
	const width =
		layout === "pair"
			? undefined
			: tall
				? `min(100%, calc(84svh * ${ratio.toFixed(4)}))`
				: `min(100%, 68rem, calc(84svh * ${ratio.toFixed(4)}))`;
	const notes = [frameDate(photo.date), exifLine(photo)].filter(Boolean).join(" · ");
	const image = (
		<Photo
			photo={toView(photo)}
			sizes={layout === "pair" ? "pair" : tall ? "printTall" : "print"}
			placeholder="blur"
			className="print h-auto w-full"
		/>
	);
	return (
		<figure className="mx-auto grid w-full gap-3" style={width ? { width } : undefined}>
			{photo.archive ? (
				<Link href={`/archive/${photo.id}`} className="block" aria-label={`Frame ${frame}, open in the archive`}>
					{image}
				</Link>
			) : (
				image
			)}
			<figcaption className="label flex flex-wrap justify-between gap-x-6 gap-y-1 text-faint">
				<span className="text-safelight">▸ {String(frame).padStart(2, "0")}</span>
				{notes && <span>{notes}</span>}
			</figcaption>
		</figure>
	);
}
