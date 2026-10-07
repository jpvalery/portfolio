import assert from "node:assert/strict";
import { test } from "node:test";
import { archiveIdFromFilename, archiveIdFromPublicId, seriesPhotoId } from "../scripts/photos/lib/ids.ts";

test("archive filename to id", () => {
	assert.equal(archiveIdFromFilename("JpValery-Photo-Archive-2015_04_12.jpg"), "2015-04-12");
	assert.equal(archiveIdFromFilename("JpValery-Photo-Archive-2015_04_12-2.jpg"), "2015-04-12-2");
	assert.throws(() => archiveIdFromFilename("IMG_0001.jpg"));
});

test("cloudinary public_id to id", () => {
	assert.equal(
		archiveIdFromPublicId("archive.jpvalery.photo/JpValery-Photo-Archive-2021_08_23-40_z6allt"),
		"2021-08-23-40",
	);
	assert.equal(archiveIdFromPublicId("archive.jpvalery.photo/JpValery-Photo-Archive-2015_04_12_abcdef"), "2015-04-12");
});

test("series photo id", () => {
	assert.equal(seriesPhotoId("analog", 3), "analog-03");
});
