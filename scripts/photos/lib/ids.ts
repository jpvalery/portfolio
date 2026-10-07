// Stable photo ids. Archive files are named JpValery-Photo-Archive-YYYY_MM_DD[-N].jpg,
// and Cloudinary appended a random `_xxxxxx` suffix to the same base name.

const ARCHIVE_FILE = /^JpValery-Photo-Archive-(\d{4})_(\d{2})_(\d{2})(?:-(\d+))?\.jpe?g$/i;
const ARCHIVE_PUBLIC_ID = /^(?:.*\/)?JpValery-Photo-Archive-(\d{4})_(\d{2})_(\d{2})(?:-(\d+))?_[a-z0-9]{6}$/i;

const toId = (m: RegExpMatchArray) => [m[1], m[2], m[3], m[4]].filter(Boolean).join("-");

/** `JpValery-Photo-Archive-2015_04_12-2.jpg` → `2015-04-12-2` */
export function archiveIdFromFilename(name: string): string {
	const m = name.match(ARCHIVE_FILE);
	if (!m) throw new Error(`not an archive filename: ${name}`);
	return toId(m);
}

/** `archive.jpvalery.photo/JpValery-Photo-Archive-2021_08_23-40_z6allt` → `2021-08-23-40` */
export function archiveIdFromPublicId(publicId: string): string {
	const m = publicId.match(ARCHIVE_PUBLIC_ID);
	if (!m) throw new Error(`not an archive public_id: ${publicId}`);
	return toId(m);
}

/** ISO date encoded in an archive id. */
export function archiveDate(id: string): string {
	return id.slice(0, 10);
}

/** `an-american-road-trip`, 3 → `an-american-road-trip-03` */
export function seriesPhotoId(seriesSlug: string, n: number): string {
	return `${seriesSlug}-${String(n).padStart(2, "0")}`;
}
