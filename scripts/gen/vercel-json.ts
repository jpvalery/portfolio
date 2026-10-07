// Generates vercel.json: redirects (incl. the old archive's /p/N links) and
// security headers. Static exports can't use next.config redirects/headers.
//
// Usage: node scripts/gen/vercel-json.ts [--check]   (--check fails if vercel.json is stale)

import fs from "node:fs";
import path from "node:path";
import { repoRoot } from "../photos/lib/paths.ts";

const SITE = "https://jpvalery.photo";
const CDN = new URL(process.env.NEXT_PUBLIC_PHOTO_CDN_URL ?? "https://img.jpvalery.photo").origin;
const ANALYTICS = "https://analytics.jpvalery.com";

const legacy: Record<string, string> = JSON.parse(
	fs.readFileSync(path.join(repoRoot, "content/redirects/archive-legacy.json"), "utf8"),
);

const csp = [
	"default-src 'self'",
	`img-src 'self' data: ${CDN}`,
	// Next's static export inlines its RSC payload in <script> tags.
	`script-src 'self' 'unsafe-inline' ${ANALYTICS}`,
	`connect-src 'self' ${ANALYTICS}`,
	"style-src 'self' 'unsafe-inline'",
	"font-src 'self'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
].join("; ");

const config = {
	$schema: "https://openapi.vercel.sh/vercel.json",
	cleanUrls: true,
	trailingSlash: false,
	redirects: [
		{ source: "/about", destination: "/biography", statusCode: 301 },
		// Old archive.jpvalery.photo photo links (/p/0 … /p/1174) → stable photo pages.
		...Object.entries(legacy).map(([n, id]) => ({
			source: `/p/${n}`,
			destination: `${SITE}/archive/${id}`,
			statusCode: 301,
		})),
		{ source: "/p/:rest*", destination: `${SITE}/archive`, statusCode: 301 },
		{
			// "/(.*)" rather than "/:path*": Vercel's "/:path*" doesn't match the bare root.
			source: "/(.*)",
			has: [{ type: "host", value: "archive.jpvalery.photo" }],
			destination: `${SITE}/archive`,
			statusCode: 301,
		},
	],
	headers: [
		{
			source: "/(.*)",
			headers: [
				{ key: "Content-Security-Policy", value: csp },
				{ key: "X-Content-Type-Options", value: "nosniff" },
				{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
				{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
			],
		},
	],
};

const routes = config.redirects.length + config.headers.length;
if (routes > 2000) throw new Error(`${routes} routes: Vercel allows 2,048 per deployment`);

const file = path.join(repoRoot, "vercel.json");
const json = `${JSON.stringify(config, null, "\t")}\n`;
if (process.argv.includes("--check")) {
	if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== json) {
		console.error("vercel.json is out of date: run pnpm gen:vercel");
		process.exit(1);
	}
	console.log(`vercel.json up to date (${routes} routes)`);
} else {
	fs.writeFileSync(file, json);
	console.log(`wrote vercel.json (${config.redirects.length} redirects, ${routes} routes)`);
}
