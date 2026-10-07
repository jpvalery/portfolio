// Browser smoke test against the static export: every key page loads without
// console errors (hydration mismatches show up here), and the archive lightbox
// opens, steps, updates the address bar, and closes back to the contact sheet.
//
// Build with NEXT_PUBLIC_PHOTO_CDN_URL=http://localhost:4100 first.
// Usage: node scripts/check/smoke.ts

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { cdnDir, repoRoot } from "../photos/lib/paths.ts";
import { serve } from "./serve.ts";

const base = "http://localhost:4000";
const servers = [await serve(path.join(repoRoot, "out"), 4000, true), await serve(cdnDir, 4100, false)];
const chapters = fs.readdirSync(path.join(repoRoot, "content/chapters")).map((f) => `/${f.replace(/\.md$/, "")}`);
const pages = [
	"/",
	...chapters,
	"/archive",
	"/archive/2016",
	"/archive/2016-05-07",
	"/blog",
	"/blog/restoring-medium-format-camera-mamiya-rb-67",
	"/biography",
	"/does-not-exist",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
const errors: string[] = [];
page.on("console", (m) => {
	const expected404 = page.url().endsWith("/does-not-exist") && m.text().includes("404");
	if (m.type() === "error" && !expected404 && !/analytics\.jpvalery\.com/.test(m.text()))
		errors.push(`${page.url()}: ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`${page.url()}: ${e.message}`));
page.on("requestfailed", (r) => {
	// Prefetches cancelled because the test navigated away are not errors.
	const why = r.failure()?.errorText ?? "";
	if (why !== "net::ERR_ABORTED" && !/analytics\.jpvalery\.com/.test(r.url()))
		errors.push(`${page.url()}: ${why} ${r.url()}`);
});
page.on("response", (r) => {
	if (r.status() >= 400 && !r.url().endsWith("/does-not-exist"))
		errors.push(`${page.url()}: HTTP ${r.status()} ${r.url()}`);
});

for (const p of pages) {
	await page.goto(base + p, { waitUntil: "networkidle" });
	assert.ok(await page.locator("h1").count(), `${p} has no h1`);
}

// Layout: <source> elements must never take up grid cells (they did once, on /archive).
await page.goto(`${base}/archive`, { waitUntil: "networkidle" });
const visibleSources = await page.evaluate(
	() => [...document.querySelectorAll("picture > source")].filter((s) => getComputedStyle(s).display !== "none").length,
);
assert.equal(visibleSources, 0, "<source> elements are laid out as boxes");

// Lightbox
await page.goto(`${base}/archive/2016`, { waitUntil: "networkidle" });
const tiles = page.locator("#sheet a[data-hash]");
const third = await tiles.nth(2).getAttribute("href");
const fourth = await tiles.nth(3).getAttribute("href");
await tiles.nth(2).click();
await page.locator("dialog[open]").waitFor();
assert.equal(new URL(page.url()).pathname, third, "opening a tile shows its URL");
await page.keyboard.press("ArrowRight");
await page.waitForFunction((href) => location.pathname === href, fourth);
await page.keyboard.press("Escape");
await page
	.locator("dialog[open]")
	.waitFor({ state: "detached" })
	.catch(() => page.waitForFunction(() => !document.querySelector("dialog[open]")));
assert.equal(new URL(page.url()).pathname, "/archive/2016", "closing returns to the contact sheet");
// Reloading a frame URL serves its own page
await page.goto(base + (fourth ?? ""), { waitUntil: "networkidle" });
assert.ok(await page.locator("figure img").count(), "frame page renders its photo");

await browser.close();
for (const s of servers) s.close();
if (errors.length) {
	console.error(`smoke: ${errors.length} console error(s)\n  ${[...new Set(errors)].slice(0, 20).join("\n  ")}`);
	process.exit(1);
}
console.log(`smoke: ${pages.length} pages clean, lightbox OK`);
