import { dump, loadAll } from "js-yaml";

// YAML frontmatter for content/*.md: "---\n<yaml>\n---\n<body>".
// Values come back untyped; callers validate them with the zod schemas.

const FENCE = /^---\r?\n(?:([\s\S]*?)\r?\n)?---[^\S\r\n]*(?:\r?\n|$)/;

export function parseFrontmatter(src: string): { data: unknown; content: string } {
	const m = FENCE.exec(src);
	if (!m) return { data: {}, content: src };
	// loadAll so an empty or comment-only block reads as {} instead of throwing.
	const [data = {}] = loadAll(m[1] ?? "");
	return { data, content: src.slice(m[0].length) };
}

export function stringifyFrontmatter(body: string, data: object): string {
	return `---\n${dump(data)}---\n${body.endsWith("\n") ? body : `${body}\n`}`;
}
