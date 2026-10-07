// `sizes` attributes for every place a photo is drawn. Keep these in step with the
// CSS widths so the browser picks the smallest variant that stays sharp.

export const SIZES = {
	/** Home pile: up to 3 columns inside a 90rem page. */
	pile: "(min-width: 1280px) 26rem, (min-width: 720px) 42vw, 86vw",
	/** Chapter page, one landscape print. */
	print: "(min-width: 1200px) 68rem, 92vw",
	/** Chapter page, a portrait print standing alone (height-capped). */
	printTall: "(min-width: 720px) 42rem, 92vw",
	/** Chapter page, two portraits side by side. */
	pair: "(min-width: 1200px) 33rem, (min-width: 720px) 45vw, 92vw",
	/** Archive contact sheet tile. */
	tile: "(min-width: 1536px) 11rem, (min-width: 1024px) 16vw, (min-width: 720px) 24vw, (min-width: 640px) 32vw, 48vw",
	/** Archive photo page and lightbox. */
	full: "(min-width: 1200px) 80vw, 96vw",
	/** Blog card thumbnail. */
	thumb: "12rem",
	/** Inline image in a blog post. */
	prose: "(min-width: 768px) 42rem, 92vw",
} as const;

export type SizesPreset = keyof typeof SIZES;
