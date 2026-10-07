import os from "node:os";
import path from "node:path";

export const repoRoot = path.resolve(import.meta.dirname, "../../..");

/** Originals live outside the repo and are backed up to the private R2 bucket. */
export const photosSrc = path.resolve(
	(process.env.PHOTOS_SRC ?? "~/Pictures/jpvalery-library").replace(/^~(?=$|\/)/, os.homedir()),
);

/** Local mirror of everything uploaded to the public CDN bucket. */
export const cdnDir = path.join(repoRoot, ".cache/cdn");

export const manifestPath = path.join(repoRoot, "content/photos/manifest.json");
