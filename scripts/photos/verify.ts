// Checks that every variant the manifest promises actually exists: locally in
// .cache/cdn, or with --remote on the public CDN (HEAD requests).
//
// Usage: node scripts/photos/verify.ts [--remote]

import fs from "node:fs";
import path from "node:path";
import { Manifest } from "../../lib/schemas.ts";
import { cdnDir, manifestPath } from "./lib/paths.ts";
import { variantKeys } from "./lib/pipeline.ts";

const remote = process.argv.includes("--remote");
const base = (process.env.NEXT_PUBLIC_PHOTO_CDN_URL ?? "https://img.jpvalery.photo").replace(/\/$/, "");
const manifest = Manifest.parse(JSON.parse(fs.readFileSync(manifestPath, "utf8")));
const keys = manifest.photos.flatMap((p) => variantKeys(p.hash, p.widths));

const missing: string[] = [];
if (remote) {
	const queue = [...keys];
	await Promise.all(
		Array.from({ length: 16 }, async () => {
			for (let k = queue.shift(); k; k = queue.shift()) {
				const res = await fetch(`${base}/${k}`, { method: "HEAD" });
				if (!res.ok) missing.push(`${k} (${res.status})`);
			}
		}),
	);
} else {
	for (const k of keys) if (!fs.existsSync(path.join(cdnDir, k))) missing.push(k);
}

if (missing.length) {
	console.error(
		`${missing.length} of ${keys.length} variants missing ${remote ? `on ${base}` : "locally"}:\n  ${missing.slice(0, 20).join("\n  ")}`,
	);
	process.exit(1);
}
console.log(
	`all ${keys.length} variants of ${manifest.photos.length} photos present ${remote ? `on ${base}` : "locally"}`,
);
