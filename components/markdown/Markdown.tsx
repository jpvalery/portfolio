import type { Element, RootContent } from "hast";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import { Photo } from "@/components/photo/Photo.tsx";
import { toView } from "@/lib/photos.ts";

/** Allows `photo:<id>` image sources alongside the default safe URL schemes. */
const urlTransform = (url: string) => (url.startsWith("photo:") ? url : defaultUrlTransform(url));

const isImage = (n: RootContent): n is Element => n.type === "element" && n.tagName === "img";
const isBlank = (n: RootContent) => n.type === "text" && n.value.trim() === "";

/**
 * Markdown from content/. Images written as `![alt](photo:<id> "caption")` render
 * through <Photo>, so they use the CDN variants like every other photo. A paragraph
 * holding only images becomes a figure (or a small grid of them), never a <p>.
 */
export function Markdown({ source }: { source: string }) {
	return (
		<ReactMarkdown
			urlTransform={urlTransform}
			components={{
				p: ({ node, children }) => {
					const kids = node?.children ?? [];
					const images = kids.filter(isImage);
					if (images.length && kids.every((k) => isImage(k) || isBlank(k))) {
						return images.length === 1 ? children : <div className="not-prose my-8 grid grid-cols-2 gap-4">{children}</div>;
					}
					return <p>{children}</p>;
				},
				img: ({ src, alt, title }) => {
					if (typeof src !== "string" || !src.startsWith("photo:")) return null;
					const view = toView(src.slice("photo:".length));
					return (
						<figure className="m-0">
							<Photo
								photo={{ ...view, alt: alt || view.alt }}
								sizes="prose"
								placeholder="blur"
								className="print h-auto w-full"
							/>
							{title && <figcaption>{title}</figcaption>}
						</figure>
					);
				},
			}}
		>
			{source}
		</ReactMarkdown>
	);
}
