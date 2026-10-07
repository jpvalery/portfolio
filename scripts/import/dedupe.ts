// Computes a dHash for every archive original and every Contentful image asset
// (cached in .migration/dhash.json) and reports likely duplicates.
//
// Usage: node scripts/import/dedupe.ts

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { dhash, hamming, sameAspect } from "../photos/lib/dhash.ts";
import { photosSrc, repoRoot } from "../photos/lib/paths.ts";

export type Hashed = { file: string; hash: bigint; width: number; height: number };

const cachePath = path.join(repoRoot, ".migration/dhash.json");

export async function hashAll(): Promise<Hashed[]> {
	const cache: Record<string, { size: number; hash: string; width: number; height: number }> = fs.existsSync(cachePath)
		? JSON.parse(fs.readFileSync(cachePath, "utf8"))
		: {};
	const files = ["archive", "contentful"].flatMap((dir) =>
		fs
			.readdirSync(path.join(photosSrc, dir))
			.filter((f) => /\.(jpe?g|png|tiff?|webp)$/i.test(f))
			.map((f) => `${dir}/${f}`),
	);
	const queue = [...files];
	const work = async () => {
		for (let f = queue.shift(); f; f = queue.shift()) {
			const size = fs.statSync(path.join(photosSrc, f)).size;
			if (cache[f]?.size === size) continue;
			const r = await dhash(path.join(photosSrc, f));
			cache[f] = { size, hash: r.hash.toString(16), width: r.width, height: r.height };
		}
	};
	await Promise.all(Array.from({ length: Math.max(2, os.availableParallelism() - 2) }, work));
	fs.writeFileSync(cachePath, JSON.stringify(cache));
	return files.map((file) => ({ file, ...cache[file], hash: BigInt(`0x${cache[file].hash}`) }));
}

/** Best match for `a` among `pool`, if framing matches. */
export function bestMatch(a: Hashed, pool: Hashed[]) {
	let best: { other: Hashed; d: number } | undefined;
	for (const other of pool) {
		if (other.file === a.file || !sameAspect(a, other)) continue;
		const d = hamming(a.hash, other.hash);
		if (!best || d < best.d) best = { other, d };
	}
	return best;
}

if (import.meta.main) {
	const all = await hashAll();
	const archive = all.filter((h) => h.file.startsWith("archive/"));
	const contentful = all.filter((h) => h.file.startsWith("contentful/"));
	const hist = new Map<number, number>();
	for (const c of contentful) {
		const m = bestMatch(c, archive);
		const d = m ? m.d : 99;
		hist.set(Math.min(d, 20), (hist.get(Math.min(d, 20)) ?? 0) + 1);
	}
	console.log(`${archive.length} archive, ${contentful.length} contentful hashed`);
	console.log("contentful → nearest archive, distance histogram (20 = 20+ or no same-aspect candidate):");
	for (const [d, n] of [...hist].sort((a, b) => a[0] - b[0])) console.log(`  ${String(d).padStart(2)}: ${n}`);
}
