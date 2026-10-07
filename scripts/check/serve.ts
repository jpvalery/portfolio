// Tiny static server for local checks: clean URLs like Vercel (/a/b → a/b.html)
// and Brotli for text, so measured transfer sizes resemble production.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";

const TYPES: Record<string, string> = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript",
	".css": "text/css",
	".txt": "text/plain",
	".json": "application/json",
	".xml": "application/xml",
	".svg": "image/svg+xml",
	".webp": "image/webp",
	".avif": "image/avif",
	".jpg": "image/jpeg",
	".png": "image/png",
	".ico": "image/x-icon",
	".woff2": "font/woff2",
};

export function serve(root: string, port: number, cleanUrls: boolean) {
	const server = http.createServer((req, res) => {
		const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
		let file = path.join(root, url);
		if (cleanUrls) {
			if (url.endsWith("/")) file = path.join(file, "index.html");
			else if (!path.extname(url) && fs.existsSync(`${file}.html`)) file = `${file}.html`;
		}
		if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
			// Like Vercel: unknown paths get the site's 404 page.
			const notFound = path.join(root, "404.html");
			if (cleanUrls && fs.existsSync(notFound)) {
				res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Content-Encoding": "br" });
				res.end(zlib.brotliCompressSync(fs.readFileSync(notFound)));
			} else res.writeHead(404).end();
			return;
		}
		const type = TYPES[path.extname(file)] ?? "application/octet-stream";
		const body = fs.readFileSync(file);
		const compress = /text|javascript|json|xml|svg/.test(type);
		res.setHeader("Content-Type", type);
		res.setHeader("Access-Control-Allow-Origin", "*");
		if (compress) {
			res.setHeader("Content-Encoding", "br");
			res.end(zlib.brotliCompressSync(body));
		} else res.end(body);
	});
	return new Promise<http.Server>((resolve) => server.listen(port, () => resolve(server)));
}
