/** Deterministic pile rotations from the chapter slug, so server and client agree. */
export function pileRotations(slug: string): { r0: number; r1: number; r2: number } {
	let h = 2166136261;
	for (const ch of slug) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
	const unit = (shift: number) => ((h >>> shift) & 0xff) / 255;
	const side = h & 1 ? 1 : -1;
	return {
		r0: Math.round((unit(8) * 2.4 - 1.2) * 10) / 10,
		r1: (side * Math.round((2 + unit(16) * 2.5) * 10)) / 10,
		r2: (-side * Math.round((2 + unit(24) * 2.5) * 10)) / 10,
	};
}
