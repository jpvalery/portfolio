import type { CSSProperties } from "react";
import logos from "./logos.json" with { type: "json" };

// Sizes come from logo-soup (scripts/gen/press-logos.ts): each logo gets the width and
// height that make it read at the same visual weight as the others, plus a small
// optical-centre nudge. --s scales the whole strip down on small screens.
const FILES: Record<string, keyof typeof logos> = {
	CBC: "cbc.svg",
	"Explore Canada": "explore-canada.svg",
	"Lonely Planet": "lonely-planet.svg",
	"Bored Panda": "bored-panda.svg",
	PetaPixel: "peta-pixel.svg",
	"abdz.do": "abduzeedo.png",
	Unsplash: "unsplash.svg",
	Burst: "burst.svg",
	Scribe: "scribe.png",
	VYSUAL: "vysual.svg",
	Kedge: "kedge.svg",
};

export function AsSeenOn({ names }: { names: string[] }) {
	return (
		<section aria-labelledby="press" className="grid gap-6 border-rule border-y py-8">
			<h2 id="press" className="label text-safelight">
				As seen on
			</h2>
			<ul className="grid grid-cols-3 items-center justify-items-center gap-y-10 [--s:0.72] sm:grid-cols-4 lg:grid-cols-6 md:[--s:0.9] lg:[--s:1]">
				{names.map((name) => {
					const file = FILES[name];
					if (!file)
						throw new Error(`No logo file for press outlet "${name}"; add it to public/press and run pnpm gen:press`);
					const d = logos[file];
					const style: CSSProperties = {
						width: `calc(${d.width}px * var(--s))`,
						height: `calc(${d.height}px * var(--s))`,
						transform: `translate(calc(${d.offsetX}px * var(--s)), calc(${d.offsetY}px * var(--s)))`,
					};
					return (
						<li key={name} className="flex items-center">
							<img src={`/press/${file}`} alt={name} width={d.width} height={d.height} loading="lazy" style={style} />
						</li>
					);
				})}
				<li className="label text-faint">and more</li>
			</ul>
		</section>
	);
}
