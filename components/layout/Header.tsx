import Link from "next/link";
import { SITE } from "@/lib/site.ts";
import { NavLinks } from "./NavLinks.tsx";

export function Header() {
	return (
		<header className="label mx-auto flex w-full max-w-[90rem] flex-wrap items-baseline justify-between gap-x-10 gap-y-3 px-4 pt-5 pb-4 text-dim md:px-8 md:pt-7">
			<Link href="/" className="text-ink hover:text-safelight">
				{SITE.name}
			</Link>
			<NavLinks contact={SITE.contact} />
		</header>
	);
}
