// Before switching nameservers at Porkbun: asks the old (Vercel) and new (Cloudflare)
// authoritative nameservers the same questions and fails on any difference, so
// mail and site records can't silently go missing.
//
// Usage: node scripts/check/dns-parity.ts <zone> <cloudflare-ns-1> [names-file]
//   names-file: one "name type" per line (e.g. "@ MX", "google._domainkey TXT"),
//   from the Vercel record export. Defaults to the common names below.

import { Resolver } from "node:dns/promises";
import fs from "node:fs";

const [zone, cfNs, namesFile] = process.argv.slice(2);
if (!zone || !cfNs) throw new Error("usage: dns-parity.ts <zone> <cloudflare-ns> [names-file]");

const DEFAULT = [
	"@ A",
	"@ AAAA",
	"@ MX",
	"@ TXT",
	"@ CAA",
	"www CNAME",
	"www A",
	"_dmarc TXT",
	"google._domainkey TXT",
	"archive CNAME",
	"archive A",
];
const queries = (namesFile ? fs.readFileSync(namesFile, "utf8").split("\n") : DEFAULT)
	.map((l) => l.trim())
	.filter((l) => l && !l.startsWith("#"))
	.map((l) => {
		const [name, type] = l.split(/\s+/);
		return { fqdn: name === "@" ? zone : `${name}.${zone}`, type: type.toUpperCase() };
	});

async function resolverFor(host: string) {
	const r = new Resolver();
	const [ip] = await new Resolver().resolve4(host);
	r.setServers([ip]);
	return r;
}

const old = await resolverFor("ns1.vercel-dns.com");
const neu = await resolverFor(cfNs);

const normalize = (v: unknown): string[] =>
	(Array.isArray(v) ? v : [v])
		.map((x) =>
			Array.isArray(x)
				? x.join("")
				: typeof x === "object"
					? JSON.stringify(x, Object.keys(x as object).sort())
					: String(x),
		)
		.map((s) => s.toLowerCase())
		.sort();

async function ask(r: Resolver, fqdn: string, type: string) {
	try {
		return normalize(await r.resolve(fqdn, type as "A"));
	} catch (err) {
		const code = (err as { code?: string }).code;
		return code === "ENODATA" || code === "ENOTFOUND" ? [] : [`error:${code}`];
	}
}

// Vercel DNS answers project domains with its own anycast IPs; on Cloudflare the same
// names carry Vercel's CNAME targets (flattened at the apex, or via the wildcard).
// Both reach Vercel, so that's not a gap.
const VERCEL_TARGET =
	/^(76\.76\.21\.\d+|66\.33\.60\.\d+|216\.198\.79\.\d+|64\.29\.17\.\d+|.*\.vercel-dns(-\d+)?\.com\.?)$/;
const allVercel = (v: string[]) => v.length > 0 && v.every((x) => VERCEL_TARGET.test(x));

/** CA domains allowed to issue ("pki.goog; cansignhttpexchanges=yes" → "pki.goog"). */
const caaIssuers = (records: string[]) =>
	records.flatMap((r) => {
		const issue = (JSON.parse(r) as { issue?: string }).issue;
		return issue ? [issue.split(";")[0].trim()] : [];
	});

/** An empty A answer from an authoritative server can mean "it's a CNAME"; follow that one hop. */
async function viaCname(r: Resolver, fqdn: string, type: string, answer: string[]) {
	return answer.length === 0 && (type === "A" || type === "AAAA") ? ask(r, fqdn, "CNAME") : answer;
}

let diffs = 0;
for (const { fqdn, type } of queries) {
	let [a, b] = await Promise.all([ask(old, fqdn, type), ask(neu, fqdn, type)]);
	let why = "";
	const same = JSON.stringify(a) === JSON.stringify(b);
	if (!same) {
		[a, b] = await Promise.all([viaCname(old, fqdn, type, a), viaCname(neu, fqdn, type, b)]);
		if (allVercel(a) && allVercel(b)) why = "both point at Vercel";
		else if (a.length === 0 && allVercel(b)) why = "only via Cloudflare's wildcard, which points at Vercel";
		// Cloudflare adds the CAs it uses for its own certificates; a superset still allows Vercel's.
		else if (type === "CAA" && caaIssuers(a).every((ca) => caaIssuers(b).includes(ca)))
			why = "Cloudflare added its own CAs; Vercel's are still allowed";
	}
	if (!same && !why) diffs++;
	const status = same ? "same" : why ? "ok  " : "DIFF";
	const detail =
		same || why ? "" : `\n      vercel:     ${a.join(" | ") || "(none)"}\n      cloudflare: ${b.join(" | ") || "(none)"}`;
	console.log(`${status}  ${type.padEnd(5)} ${fqdn}${why ? `  (${why})` : ""}${detail}`);
}
if (diffs) {
	console.error(`\n${diffs} difference(s): don't switch nameservers yet.`);
	process.exit(1);
}
console.log(`\nAll ${queries.length} answers match. Safe to switch nameservers.`);
