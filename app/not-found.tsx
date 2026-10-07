import Link from "next/link";

export default function NotFound() {
	return (
		<section className="mx-auto grid max-w-[90rem] gap-6 px-4 pt-16 pb-24 md:px-8">
			<p className="label text-safelight">404 · Frame not found</p>
			<h1 className="font-cond text-[clamp(3.4rem,12vw,10rem)]">Overexposed</h1>
			<p className="max-w-xl text-dim text-xl leading-relaxed">
				This page didn’t make it out of the darkroom. Try the chapters or the archive.
			</p>
			<p className="label flex gap-6">
				<Link href="/" className="underline decoration-safelight underline-offset-[6px] hover:text-safelight">
					Chapters
				</Link>
				<Link href="/archive" className="underline decoration-safelight underline-offset-[6px] hover:text-safelight">
					Archive
				</Link>
			</p>
		</section>
	);
}
