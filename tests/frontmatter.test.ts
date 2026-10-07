import assert from "node:assert/strict";
import { test } from "node:test";
import { parseFrontmatter, stringifyFrontmatter } from "../lib/frontmatter.ts";

test("frontmatter round-trips, keeping quoted dates as strings", () => {
	const data = { title: "New site, who dis?", date: "2019-03-03", tags: ["article"], draft: false };
	const src = stringifyFrontmatter("Body\n", data);
	assert.match(src, /^---\n[\s\S]*\n---\nBody\n$/);
	assert.deepEqual(parseFrontmatter(src), { data, content: "Body\n" });
});

test("missing or empty frontmatter reads as {}", () => {
	assert.deepEqual(parseFrontmatter("Just text\n"), { data: {}, content: "Just text\n" });
	assert.deepEqual(parseFrontmatter("---\n---\nBody"), { data: {}, content: "Body" });
	assert.deepEqual(parseFrontmatter("---\n# only a comment\n---\n"), { data: {}, content: "" });
});
