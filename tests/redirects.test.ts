import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

const legacy: Record<string, string> = JSON.parse(fs.readFileSync("content/redirects/archive-legacy.json", "utf8"));
const library: { id: string; archive: boolean }[] = JSON.parse(fs.readFileSync("content/photos/library.json", "utf8"));
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));

test("every old archive link /p/0 … /p/1174 maps to a distinct archive photo", () => {
	assert.equal(Object.keys(legacy).length, 1175);
	for (let n = 0; n < 1175; n++) assert.ok(legacy[String(n)], `missing /p/${n}`);
	const ids = Object.values(legacy);
	assert.equal(new Set(ids).size, ids.length);
	const archive = new Set(library.filter((e) => e.archive).map((e) => e.id));
	for (const id of ids) assert.ok(archive.has(id), `${id} is not an archive photo`);
});

test("vercel.json sends permanent redirects, specific rules before catch-alls", () => {
	const r: { source: string; statusCode: number; has?: unknown }[] = vercel.redirects;
	assert.ok(r.every((x) => x.statusCode === 301));
	const firstCatchAll = r.findIndex((x) => x.source === "/p/:rest*");
	const lastLegacy = r.findLastIndex((x) => /^\/p\/\d+$/.test(x.source));
	assert.ok(lastLegacy < firstCatchAll);
	assert.ok(r.at(-1)?.has, "the archive host rule comes last");
	assert.ok(r.length + vercel.headers.length < 2048);
});
