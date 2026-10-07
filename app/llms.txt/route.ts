import { allChapters, allPosts, biography, listedChapters } from "@/lib/content.ts";
import { archivePhotos, archiveYears } from "@/lib/photos.ts";
import { SITE } from "@/lib/site.ts";

// /llms.txt (https://llmstxt.org): a Markdown index of the site for language models.
// Built from content/ at export time, so new chapters and posts show up on their own.
// The longer guide for agents is the static public/agent.md.

export const dynamic = "force-static";

const url = (path: string) => new URL(path, SITE.url).toString();
const link = (title: string, path: string, note?: string) => `- [${title}](${url(path)})${note ? `: ${note}` : ""}`;

export function GET() {
	const years = archiveYears().map((y) => y.year);
	const first = Math.min(...years);
	const last = Math.max(...years);
	const photos = archivePhotos();
	const example = photos[0]?.id;

	const text = [
		`# ${SITE.title}`,
		"",
		`> ${SITE.description} The site has chapters (curated bodies of work), an archive of contact sheets with every frame kept from ${first} to ${last}, a biography and a small blog.`,
		"",
		`- The name is written "${SITE.name}".`,
		`- Photos are © ${SITE.name}. This site does not license them for reuse. For licensing, commissions or collaborations, use the contact page: ${SITE.contact}`,
		"- Except for the Double Expos series, the photographs are not digitally altered (no retouching or compositing).",
		"- The site is fully static: plain HTML pages, no API, no search, no forms. Most pages have schema.org JSON-LD.",
		`- Guidance for AI agents (URL patterns, structured data, image use, attribution): ${url("/agent.md")}`,
		"",
		"## Chapters",
		"",
		...listedChapters().map((c) => link(c.title, `/${c.slug}`, c.description)),
		"",
		"## Archive",
		"",
		link(
			"Archive",
			"/archive",
			`Contact sheets of every frame kept from ${first} to ${last} (${photos.length.toLocaleString("en-CA")} photos), in the order they were taken. Each year has a page at /archive/<year>, and each photo has a page at /archive/<photo-id>${example ? ` (for example /archive/${example})` : ""}.`,
		),
		"",
		"## About",
		"",
		link("Biography", "/biography", biography().description),
		link("Contact", SITE.contact, "Commissions, collaborations and photo licensing."),
		"",
		"## Blog",
		"",
		...allPosts().map((p) => link(p.title, `/blog/${p.slug}`, p.description)),
		"",
		"## Optional",
		"",
		...allChapters()
			.filter((c) => !c.listed)
			.map((c) => link(c.title, `/${c.slug}`, c.description)),
		link("Sitemap", "/sitemap.xml", "Every page URL, with image URLs."),
		link("Unsplash", SITE.links.unsplash, "Free photos under the Unsplash License."),
		link("Instagram", SITE.links.instagram),
		link("Montréal Photo Club", SITE.links.photoClub, "A photography community Jp founded in 2019."),
		"",
	].join("\n");

	return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
