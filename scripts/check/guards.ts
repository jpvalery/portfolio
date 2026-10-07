// Cost guardrails. Fails the build if anything could route images through Vercel's
// optimizer or ship a URL to the retired image hosts.
//
//   --src   scan app/, components/, lib/ before building
//   --out   scan the static export (out/) after building

import fs from "node:fs";
import path from "node:path";
import { repoRoot } from "../photos/lib/paths.ts";

const mode = process.argv[2];
if (mode !== "--src" && mode !== "--out") throw new Error("usage: guards.ts --src | --out");

const SRC_RULES: [RegExp, string][] = [
	[
		/from\s+["']next\/(legacy\/)?image["']/,
		"next/image routes images through Vercel's optimizer; use components/photo/Photo",
	],
	[/["']force-dynamic["']/, "force-dynamic would need a serverless function"],
	[/^\s*["']use server["']/m, "server actions need a serverless function"],
	[/ctfassets\.net|res\.cloudinary\.com/, "retired image host"],
];
const OUT_RULES: [RegExp, string][] = [
	[/ctfassets\.net/, "Contentful asset URL"],
	[/res\.cloudinary\.com/, "Cloudinary URL"],
	[/\.r2\.dev\b/, "r2.dev URL (rate-limited, uncached; use img.jpvalery.photo)"],
	[/\/_next\/image/, "Vercel image optimizer URL"],
];

function* walk(dir: string, exts: RegExp): Generator<string> {
	if (!fs.existsSync(dir)) return;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(full, exts);
		else if (exts.test(entry.name)) yield full;
	}
}

const problems: string[] = [];
const scan = (files: Iterable<string>, rules: [RegExp, string][]) => {
	let n = 0;
	for (const file of files) {
		n++;
		const text = fs.readFileSync(file, "utf8");
		for (const [re, why] of rules) if (re.test(text)) problems.push(`${path.relative(repoRoot, file)}: ${why}`);
	}
	return n;
};

let scanned = 0;
if (mode === "--src") {
	for (const dir of ["app", "components", "lib"])
		scanned += scan(walk(path.join(repoRoot, dir), /\.(tsx?|jsx?|mjs)$/), SRC_RULES);
	scanned += scan(
		[path.join(repoRoot, "next.config.ts")],
		[[/unoptimized:\s*false/, "image optimization must stay off"]],
	);
} else {
	const out = path.join(repoRoot, "out");
	if (!fs.existsSync(path.join(out, "index.html")))
		problems.push("out/index.html missing: the build did not produce a static export");
	scanned += scan(walk(out, /\.(html|txt|js|css|xml|json)$/), OUT_RULES);
	if (fs.existsSync(path.join(repoRoot, ".vercel/output/functions")))
		problems.push(".vercel/output/functions exists: something needs a serverless function");
}

if (problems.length) {
	console.error(`guards ${mode}: ${problems.length} problem(s)\n  ${problems.join("\n  ")}`);
	process.exit(1);
}
console.log(`guards ${mode}: ${scanned} files clean`);
