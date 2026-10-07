// Balances the "As seen on" logos with logo-soup: measures each file's content box,
// pixel density and visual centre, then writes normalized width/height (and optical
// offsets) so wide wordmarks and dense icons read at the same visual size.
// Runs locally; the output is committed, so the page ships no extra JavaScript.
//
// Usage: node scripts/gen/press-logos.ts

import fs from "node:fs";
import path from "node:path";
import { analyzeDirectory, normalize } from "logo-soup";
import sharp from "sharp";
import { repoRoot } from "../photos/lib/paths.ts";

const dir = path.join(repoRoot, "public/press");
const COLOR = "#a9a69c";

// Outlets without a vector logo: render their wordmark once, as the old site styled it.
const WORDMARKS = [
	{
		file: "abduzeedo.png",
		markup: `<span foreground="${COLOR}" font_weight="bold">abdz.do</span>`,
		font: "Helvetica Neue",
	},
	{ file: "scribe.png", markup: `<span foreground="${COLOR}" font_weight="500">Scribe</span>`, font: "Georgia" },
];
for (const w of WORDMARKS) {
	await sharp({ text: { text: w.markup, font: `${w.font} 48`, rgba: true, dpi: 144 } })
		.trim()
		.png()
		.toFile(path.join(dir, w.file));
}

const metrics = await analyzeDirectory(dir, { extensions: ["svg", "png"] });
const out: Record<string, { width: number; height: number; offsetX: number; offsetY: number }> = {};
for (const [file, m] of [...metrics].sort(([a], [b]) => a.localeCompare(b))) {
	const d = normalize(m, { baseSize: 44 });
	out[file] = {
		width: Math.round(d.width),
		height: Math.round(d.height),
		offsetX: Math.round(d.offsetX * 10) / 10,
		offsetY: Math.round(d.offsetY * 10) / 10,
	};
}
const target = path.join(repoRoot, "components/press/logos.json");
fs.writeFileSync(target, `${JSON.stringify(out, null, "\t")}\n`);
for (const [f, d] of Object.entries(out))
	console.log(f.padEnd(20), `${d.width}×${d.height}`.padEnd(9), `offset ${d.offsetX},${d.offsetY}`);
