import type { Chapter } from "@/lib/content.ts";

export const chapterLabel = (c: Chapter) => `Chapter ${String(c.chapter).padStart(2, "0")}`;

/** "2018 · 36 frames · New England" */
export function chapterMeta(c: Chapter): string {
	const frames = `${c.photos.length} ${c.photos.length === 1 ? "frame" : "frames"}`;
	return [c.years, frames, c.location].filter(Boolean).join(" · ");
}
