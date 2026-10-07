// Page-weight budget. Serves the static export (out/) and the local CDN mirror
// (.cache/cdn) with compression, loads key pages in headless Chromium at desktop and
// phone sizes without scrolling, and fails if a page transfers too much.
//
// Build first with the local CDN baked in:
//   NEXT_PUBLIC_PHOTO_CDN_URL=http://localhost:4100 pnpm build
// then: node scripts/check/budget.ts [--base https://preview-url] [--pages /,/analog] [--scroll]
//   --base skips the local servers; --scroll measures a full read-through (reported, not enforced)

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { cdnDir, repoRoot } from "../photos/lib/paths.ts";
import { serve } from "./serve.ts";

const KB = 1024;
const BUDGET = { total: 3 * KB * KB, html: 250 * KB, js: 200 * KB, image: 800 * KB };
const BANNED = /ctfassets\.net|res\.cloudinary\.com|\.r2\.dev|\/_next\/image/;
const baseArg = process.argv.indexOf("--base");
const base = baseArg > 0 ? process.argv[baseArg + 1] : "http://localhost:4000";
const servers =
	baseArg > 0 ? [] : [await serve(path.join(repoRoot, "out"), 4000, true), await serve(cdnDir, 4100, false)];

const scroll = process.argv.includes("--scroll");
const pagesArg = process.argv.indexOf("--pages");
const chapters = fs.readdirSync(path.join(repoRoot, "content/chapters")).map((f) => `/${f.replace(/\.md$/, "")}`);
const legacy: Record<string, string> = JSON.parse(
	fs.readFileSync(path.join(repoRoot, "content/redirects/archive-legacy.json"), "utf8"),
);
const pages = [
	"/",
	...chapters,
	"/archive",
	"/archive/2016",
	"/archive/2017",
	`/archive/${legacy["0"]}`,
	`/archive/${legacy["600"]}`,
	"/blog",
	"/blog/restoring-medium-format-camera-mamiya-rb-67",
	"/biography",
];
if (pagesArg > 0) pages.splice(0, pages.length, ...process.argv[pagesArg + 1].split(","));
const viewports = [
	{ name: "desktop", width: 1440, height: 900, deviceScaleFactor: 2 },
	{ name: "phone", width: 390, height: 844, deviceScaleFactor: 3 },
];

const browser = await chromium.launch();
const failures: string[] = [];
const rows: string[] = [];
for (const vp of viewports) {
	const context = await browser.newContext({
		viewport: { width: vp.width, height: vp.height },
		deviceScaleFactor: vp.deviceScaleFactor,
	});
	for (const pagePath of pages) {
		const page = await context.newPage();
		const cdp = await context.newCDPSession(page);
		await cdp.send("Network.enable");
		await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
		const requests = new Map<string, { url: string; type: string }>();
		const sizes = { total: 0, html: 0, js: 0, css: 0, image: 0, font: 0, maxImage: 0 };
		cdp.on("Network.responseReceived", (e) => requests.set(e.requestId, { url: e.response.url, type: e.type }));
		cdp.on("Network.loadingFinished", (e) => {
			const r = requests.get(e.requestId);
			if (!r) return;
			const n = e.encodedDataLength;
			sizes.total += n;
			if (r.type === "Document") sizes.html += n;
			else if (r.type === "Script") sizes.js += n;
			else if (r.type === "Stylesheet") sizes.css += n;
			else if (r.type === "Font") sizes.font += n;
			else if (r.type === "Image") {
				sizes.image += n;
				sizes.maxImage = Math.max(sizes.maxImage, n);
			}
			if (BANNED.test(r.url)) failures.push(`${vp.name} ${pagePath}: banned host ${r.url}`);
		});
		await page.goto(base + pagePath, { waitUntil: "networkidle" });
		if (scroll) {
			// Full read-through: scroll to the bottom so every lazy photo loads.
			await page.evaluate(async () => {
				for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.8) {
					window.scrollTo(0, y);
					await new Promise((r) => setTimeout(r, 120));
				}
			});
			await page.waitForLoadState("networkidle");
		}
		const label = `${vp.name.padEnd(7)} ${pagePath}`;
		const f = (n: number) => `${(n / KB).toFixed(0)} KB`.padStart(8);
		rows.push(
			`${label.padEnd(64)} total ${f(sizes.total)}  html ${f(sizes.html)}  js ${f(sizes.js)}  img ${f(sizes.image)} (max ${f(sizes.maxImage).trim()})`,
		);
		if (!scroll && sizes.total > BUDGET.total) failures.push(`${label}: ${f(sizes.total).trim()} total > 3 MB`);
		if (sizes.html > BUDGET.html) failures.push(`${label}: HTML ${f(sizes.html).trim()} > 250 KB`);
		if (sizes.js > BUDGET.js) failures.push(`${label}: JS ${f(sizes.js).trim()} > 200 KB`);
		if (sizes.maxImage > BUDGET.image) failures.push(`${label}: an image is ${f(sizes.maxImage).trim()} > 800 KB`);
		await page.close();
	}
	await context.close();
}
await browser.close();
for (const s of servers) s.close();

console.log(rows.join("\n"));
if (failures.length) {
	console.error(`\nbudget: ${failures.length} failure(s)\n  ${failures.join("\n  ")}`);
	process.exit(1);
}
console.log(`\nbudget: ${pages.length} pages × ${viewports.length} viewports within budget`);
