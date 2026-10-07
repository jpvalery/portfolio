import fs from "node:fs";
import path from "node:path";
import type { z } from "zod";
import { parseFrontmatter } from "./frontmatter.ts";
import { getPhoto } from "./photos.ts";
import {
	type BiographyFrontmatter as BiographyData,
	BiographyFrontmatter,
	type ChapterFrontmatter as ChapterData,
	ChapterFrontmatter,
	type PostFrontmatter as PostData,
	PostFrontmatter,
} from "./schemas.ts";

// Build-time loaders for content/. Every reference to a photo id is resolved here,
// so a typo in frontmatter fails the build instead of shipping a broken image.

export type Chapter = ChapterData & { body: string; photos: string[] };
export type Post = PostData & { body: string };
export type Biography = BiographyData & { body: string };

const root = () => path.join(process.cwd(), "content");

function readDir<T extends { slug: string }>(dir: string, schema: z.ZodType<T>): (T & { body: string })[] {
	const full = path.join(root(), dir);
	return fs
		.readdirSync(full)
		.filter((f) => f.endsWith(".md"))
		.map((f) => {
			const { data, content } = parseFrontmatter(fs.readFileSync(path.join(full, f), "utf8"));
			const parsed = schema.safeParse(data);
			if (!parsed.success) throw new Error(`content/${dir}/${f}: ${parsed.error.message}`);
			if (`${parsed.data.slug}.md` !== f) throw new Error(`content/${dir}/${f}: slug does not match the file name`);
			return { ...parsed.data, body: content.trim() };
		});
}

let chapters: Chapter[] | undefined;
export function allChapters(): Chapter[] {
	if (!chapters) {
		chapters = readDir("chapters", ChapterFrontmatter)
			.map((c) => {
				const photos = [...new Set(c.sections.flatMap((s) => s.photos))];
				for (const id of [c.cover, ...(c.pile ?? []), ...photos]) getPhoto(id);
				return { ...c, photos };
			})
			.sort((a, b) => a.chapter - b.chapter);
		const numbers = new Set(chapters.map((c) => c.chapter));
		if (numbers.size !== chapters.length) throw new Error("two chapters share a chapter number");
	}
	return chapters;
}

export const listedChapters = () => allChapters().filter((c) => c.listed);
export const getChapter = (slug: string) => allChapters().find((c) => c.slug === slug);

/** Chapters that include a photo, for "appears in" links on photo pages. */
export function chaptersWith(photoId: string): Chapter[] {
	return allChapters().filter((c) => c.kind === "chapter" && c.photos.includes(photoId));
}

let posts: Post[] | undefined;
export function allPosts(): Post[] {
	if (!posts) {
		posts = readDir("posts", PostFrontmatter)
			.filter((p) => !p.draft)
			.map((p) => {
				getPhoto(p.cover);
				return p;
			})
			.sort((a, b) => b.date.localeCompare(a.date));
	}
	return posts;
}
export const getPost = (slug: string) => allPosts().find((p) => p.slug === slug);

export function biography(): Biography {
	const { data, content } = parseFrontmatter(fs.readFileSync(path.join(root(), "pages/biography.md"), "utf8"));
	return { ...BiographyFrontmatter.parse(data), body: content.trim() };
}
