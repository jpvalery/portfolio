"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
	{ href: "/", label: "Chapters", match: (p: string) => p === "/" },
	{ href: "/archive", label: "Archive", match: (p: string) => p.startsWith("/archive") },
	{ href: "/blog", label: "Blog", match: (p: string) => p.startsWith("/blog") },
	{ href: "/biography", label: "About", match: (p: string) => p === "/biography" },
] as const;

export function NavLinks({ contact }: { contact: string }) {
	const path = usePathname();
	return (
		<nav aria-label="Main">
			<ul className="flex flex-wrap gap-x-6 gap-y-2">
				{NAV.map((item) => {
					const current = item.match(path);
					return (
						<li key={item.href}>
							<Link
								href={item.href}
								aria-current={current ? "page" : undefined}
								className="hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-safelight aria-[current=page]:underline-offset-[6px]"
							>
								{item.label}
							</Link>
						</li>
					);
				})}
				<li>
					<a href={contact} className="hover:text-ink">
						Contact
					</a>
				</li>
			</ul>
		</nav>
	);
}
