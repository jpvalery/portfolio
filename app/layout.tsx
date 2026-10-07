import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer.tsx";
import { Header } from "@/components/layout/Header.tsx";
import { SITE } from "@/lib/site.ts";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });

// No canonical here on purpose: each page sets its own (the old site pointed every
// page's canonical at the homepage).
export const metadata: Metadata = {
	metadataBase: new URL(SITE.url),
	title: { default: SITE.title, template: `%s · ${SITE.name}` },
	description: SITE.description,
	authors: [{ name: SITE.name, url: SITE.url }],
	creator: SITE.name,
};

export const viewport: Viewport = { themeColor: "#16161d", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en-CA" className={`${archivo.variable} ${dmMono.variable}`}>
			<body className="flex min-h-dvh flex-col">
				<a
					href="#main"
					className="label sr-only z-50 bg-ink px-3 py-2 text-eigengrau focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
				>
					Skip to content
				</a>
				<Header />
				<main id="main" className="flex-1">
					{children}
				</main>
				<Footer />
				<Script
					src={SITE.umami.src}
					data-website-id={SITE.umami.id}
					data-domains="jpvalery.photo"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	);
}
