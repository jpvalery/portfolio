import assert from "node:assert/strict";
import { test } from "node:test";
import { pileRotations } from "../lib/pile.ts";

test("pile rotations are deterministic and fan in opposite directions", () => {
	for (const slug of ["analog", "an-american-road-trip", "from-the-cockpit"]) {
		const a = pileRotations(slug);
		assert.deepEqual(a, pileRotations(slug));
		assert.ok(Math.abs(a.r0) <= 1.2);
		assert.ok(Math.abs(a.r1) >= 2 && Math.abs(a.r1) <= 4.5);
		assert.equal(Math.sign(a.r1), -Math.sign(a.r2));
	}
});
