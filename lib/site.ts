export const SITE = {
	name: "Jp Valery",
	url: "https://jpvalery.photo",
	title: "Jp Valery, photographer in Montréal",
	description:
		"Photographs by Jp Valery, a self-taught photographer from Montréal documenting places and the people in them across North America.",
	locale: "en_CA",
	twitter: "@jpvalery",
	contact: "https://jpvalery.me/contact/photography",
	links: {
		instagram: "https://instagram.com/jpvalery",
		unsplash: "https://unsplash.com/@jpvalery",
		photoClub: "https://montrealphoto.club",
	},
	umami: { src: "https://analytics.jpvalery.com/script.js", id: "e75bdc12-6377-4c26-90c1-06b64ad3a35a" },
	since: 1992,
} as const;

/** Public base URL of the image CDN (R2 behind img.jpvalery.photo). */
export const PHOTO_CDN = (process.env.NEXT_PUBLIC_PHOTO_CDN_URL ?? "https://img.jpvalery.photo").replace(/\/$/, "");
