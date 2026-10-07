import { SITE } from "@/lib/site.ts";

const LINKS = [
	{ href: SITE.links.instagram, label: "Instagram" },
	{ href: SITE.links.unsplash, label: "Unsplash" },
	{ href: SITE.links.photoClub, label: "Montréal Photo Club" },
	{ href: SITE.contact, label: "Contact" },
];

export function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="label mx-auto mt-24 flex w-full max-w-[90rem] flex-wrap justify-between gap-x-10 gap-y-4 border-rule border-t px-4 pt-6 pb-10 text-faint md:px-8">
			<p>
				© {SITE.since}–{year} {SITE.name}. Self-taught photographer, Montréal.
			</p>
			<ul className="flex flex-wrap gap-x-6 gap-y-2">
				{LINKS.map((l) => (
					<li key={l.href}>
						<a href={l.href} className="hover:text-ink">
							{l.label}
						</a>
					</li>
				))}
			</ul>
		</footer>
	);
}
