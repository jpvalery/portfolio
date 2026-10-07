import assert from "node:assert/strict";
import { test } from "node:test";
import { printRows } from "../lib/prints.ts";

const L = (id: string) => ({ id, width: 3000, height: 2000 });
const P = (id: string) => ({ id, width: 2000, height: 3000 });

test("consecutive portraits share a row; everything else stands alone", () => {
	const rows = printRows([P("a-1"), P("a-2"), L("a-3"), P("a-4"), L("a-5")]);
	assert.deepEqual(
		rows.map((r) => (r.kind === "pair" ? r.photos.map((p) => p.id) : r.photo.id)),
		[["a-1", "a-2"], "a-3", "a-4", "a-5"],
	);
});

test("three portraits: a pair, then a single", () => {
	assert.deepEqual(
		printRows([P("a-1"), P("a-2"), P("a-3")]).map((r) => r.kind),
		["pair", "single"],
	);
});
