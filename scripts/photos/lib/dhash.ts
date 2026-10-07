import sharp from "sharp";

/**
 * 64-bit difference hash: shrink to 9×8 greyscale, compare neighbours.
 * Robust to resizing and re-encoding, so the same photo exported at different
 * sizes or qualities lands within a few bits.
 */
export async function dhash(file: string): Promise<{ hash: bigint; width: number; height: number }> {
	const img = sharp(file, { failOn: "none", limitInputPixels: false }).rotate();
	const meta = await img.metadata();
	const { data } = await img
		.clone()
		.greyscale()
		.resize(9, 8, { fit: "fill" })
		.raw()
		.toBuffer({ resolveWithObject: true });
	let hash = 0n;
	for (let y = 0; y < 8; y++) {
		for (let x = 0; x < 8; x++) {
			hash = (hash << 1n) | (data[y * 9 + x] > data[y * 9 + x + 1] ? 1n : 0n);
		}
	}
	// metadata() reports pre-rotation dimensions; swap for EXIF orientations 5–8.
	const swap = (meta.orientation ?? 1) >= 5;
	return { hash, width: swap ? meta.height! : meta.width!, height: swap ? meta.width! : meta.height! };
}

export function hamming(a: bigint, b: bigint): number {
	let x = a ^ b;
	let n = 0;
	while (x) {
		n += Number(x & 1n);
		x >>= 1n;
	}
	return n;
}

/** Same framing: aspect ratios within 1%. */
export function sameAspect(a: { width: number; height: number }, b: { width: number; height: number }): boolean {
	const ra = a.width / a.height;
	const rb = b.width / b.height;
	return Math.abs(ra - rb) / Math.max(ra, rb) <= 0.01;
}
