// Copies every source file in the library to the private originals bucket, so the
// originals don't live only on one laptop once Contentful is gone. Skips files that
// are already there.
//
// Usage: node --env-file=.env.r2 scripts/photos/backup.ts

import fs from "node:fs";
import path from "node:path";
import { readLibrary } from "./lib/library.ts";
import { photosSrc } from "./lib/paths.ts";
import { r2Bucket } from "./lib/r2.ts";

const bucket = r2Bucket(process.env.R2_ORIGINALS_BUCKET);
if (!bucket)
	throw new Error(
		"set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_ORIGINALS_BUCKET (see .env.r2.example)",
	);

const files = [...new Set(readLibrary().map((e) => e.file))];
let uploaded = 0;
let bytes = 0;
const queue = [...files];
await Promise.all(
	Array.from({ length: 6 }, async () => {
		for (let f = queue.shift(); f; f = queue.shift()) {
			if (await bucket.exists(f)) continue;
			const body = fs.readFileSync(path.join(photosSrc, f));
			const type = /\.png$/i.test(f) ? "image/png" : "image/jpeg";
			await bucket.put(f, body, type, "private, max-age=0");
			uploaded++;
			bytes += body.length;
		}
	}),
);
console.log(
	`${uploaded} originals uploaded (${(bytes / 1024 ** 3).toFixed(2)} GB); ${files.length - uploaded} were already backed up`,
);
