import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// R2 over its S3-compatible API. Credentials are a bucket-scoped R2 token kept in a
// local, gitignored env file; they never go to Vercel.

export type Bucket = {
	put(key: string, body: Buffer, contentType: string, cacheControl: string): Promise<void>;
	exists(key: string): Promise<boolean>;
	name: string;
};

/** Retries transient network failures (dropped TLS sessions, resets) with backoff. */
async function withRetry<T>(fn: () => Promise<T>, attempts = 5): Promise<T> {
	for (let i = 1; ; i++) {
		try {
			return await fn();
		} catch (err) {
			const status = (err as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
			const clientError = status !== undefined && status >= 400 && status < 500;
			if (clientError || i >= attempts) throw err;
			await new Promise((r) => setTimeout(r, 500 * 2 ** i));
		}
	}
}

export function r2Bucket(name: string | undefined): Bucket | null {
	const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
	if (!name || !R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) return null;
	const client = new S3Client({
		region: "auto",
		endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
	});
	return {
		name,
		async put(key, body, contentType, cacheControl) {
			await withRetry(() =>
				client.send(
					new PutObjectCommand({ Bucket: name, Key: key, Body: body, ContentType: contentType, CacheControl: cacheControl }),
				),
			);
		},
		async exists(key) {
			try {
				await withRetry(() => client.send(new HeadObjectCommand({ Bucket: name, Key: key })));
				return true;
			} catch (err) {
				if ((err as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode === 404) return false;
				throw err;
			}
		},
	};
}

export const IMMUTABLE = "public, max-age=31536000, immutable";
