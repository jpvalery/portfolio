// One-time Contentful export over the Content Delivery API.
// Saves raw JSON (content types, entries, assets) to .migration/contentful/ as a
// backup and downloads every asset original to $PHOTOS_SRC/contentful/.
//
// Usage: node --env-file=.migration/contentful.env scripts/import/contentful-fetch.ts

import fs from "node:fs";
import path from "node:path";
import { photosSrc, repoRoot } from "../photos/lib/paths.ts";
import { assetFile } from "./contentful-files.ts";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
if (!space || !token) throw new Error("missing Contentful space id or delivery token");

const base = `https://cdn.contentful.com/spaces/${space}/environments/master`;
const rawDir = path.join(repoRoot, ".migration/contentful");
const assetDir = path.join(photosSrc, "contentful");
fs.mkdirSync(rawDir, { recursive: true });
fs.mkdirSync(assetDir, { recursive: true });

async function api(pathname: string, params: Record<string, string | number> = {}) {
	const url = new URL(base + pathname);
	for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
	const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
	if (!res.ok) throw new Error(`${res.status} ${url.pathname}`);
	return res.json();
}

async function all(pathname: string) {
	const items: unknown[] = [];
	for (let skip = 0; ; skip += 1000) {
		const page = await api(pathname, { limit: 1000, skip });
		items.push(...page.items);
		if (skip + page.items.length >= page.total) return items;
	}
}

const contentTypes = await all("/content_types");
const entries = await all("/entries");
const assets = (await all("/assets")) as {
	sys: { id: string };
	fields: { title?: string; description?: string; file?: { url: string; fileName: string; details: { size: number } } };
}[];

for (const [name, data] of Object.entries({ contentTypes, entries, assets })) {
	fs.writeFileSync(path.join(rawDir, `${name}.json`), JSON.stringify(data, null, 1));
}
console.log(`${contentTypes.length} content types, ${entries.length} entries, ${assets.length} assets`);

let downloaded = 0;
let bytes = 0;
const queue = assets.filter((a) => a.fields.file);
async function worker() {
	for (let a = queue.shift(); a; a = queue.shift()) {
		const file = a.fields.file;
		if (!file) continue;
		const dest = path.join(assetDir, assetFile(a));
		bytes += file.details.size;
		if (fs.existsSync(dest) && fs.statSync(dest).size === file.details.size) continue;
		for (let attempt = 1; ; attempt++) {
			try {
				const res = await fetch(`https:${file.url}`);
				if (!res.ok) throw new Error(`${res.status}`);
				const buf = Buffer.from(await res.arrayBuffer());
				if (buf.length !== file.details.size) throw new Error(`size mismatch ${buf.length} vs ${file.details.size}`);
				fs.writeFileSync(`${dest}.part`, buf);
				fs.renameSync(`${dest}.part`, dest);
				downloaded++;
				break;
			} catch (err) {
				if (attempt === 4) throw new Error(`failed ${file.url}: ${err}`);
				await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
			}
		}
	}
}
await Promise.all(Array.from({ length: 4 }, worker));
console.log(`downloaded ${downloaded} new files; ${(bytes / 1024 ** 3).toFixed(2)} GB of originals in ${assetDir}`);
