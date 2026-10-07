"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { jpegUrl, srcSet } from "@/components/photo/url.ts";

type Item = {
	id: string;
	hash: string;
	w: number;
	h: number;
	widths: number[];
	alt: string;
	color: string;
	date: string;
};

const DAY = new Intl.DateTimeFormat("en-CA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const SIZES = "(min-width: 1200px) 86vw, 96vw";

function readItems(sheet: HTMLElement): Item[] {
	return [...sheet.querySelectorAll<HTMLAnchorElement>("a[data-hash]")].map((a) => {
		const img = a.querySelector("img");
		const [w, h] = (a.dataset.size ?? "1x1").split("x").map(Number);
		return {
			id: a.pathname.split("/").pop() ?? "",
			hash: a.dataset.hash ?? "",
			w,
			h,
			widths: (a.dataset.widths ?? "").split(",").map(Number),
			alt: img?.alt ?? "",
			color: img?.style.backgroundColor ?? "",
			date: a.dataset.date ?? "",
		};
	});
}

function Frame({ item, hidden }: { item: Item; hidden?: boolean }) {
	return (
		<picture className="contents">
			<source type="image/avif" srcSet={srcSet(item.hash, item.widths, "avif")} sizes={SIZES} />
			<source type="image/webp" srcSet={srcSet(item.hash, item.widths, "webp")} sizes={SIZES} />
			<img
				src={jpegUrl(item.hash)}
				width={item.w}
				height={item.h}
				alt={hidden ? "" : item.alt}
				aria-hidden={hidden || undefined}
				className={hidden ? "sr-only" : "print absolute inset-0 m-auto h-auto max-h-full w-auto max-w-full"}
				style={hidden ? undefined : { backgroundColor: item.color }}
			/>
		</picture>
	);
}

/**
 * Full-screen viewer for a contact sheet. Tiles stay plain links (so open-in-new-tab
 * and no-JS work); a normal click opens the frame here instead and puts its
 * /archive/[id] URL in the address bar, so it can be shared or reloaded.
 */
export function Lightbox({ sheetId }: { sheetId: string }) {
	const dialog = useRef<HTMLDialogElement>(null);
	const items = useRef<Item[]>([]);
	const touchX = useRef<number | null>(null);
	const [index, setIndex] = useState<number | null>(null);

	useEffect(() => {
		const sheet = document.getElementById(sheetId);
		if (!sheet) return;
		items.current = readItems(sheet);
		const onClick = (e: MouseEvent) => {
			if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			const a = (e.target as Element).closest<HTMLAnchorElement>("a[data-hash]");
			if (!a) return;
			const i = items.current.findIndex((it) => a.pathname.endsWith(`/${it.id}`));
			if (i < 0) return;
			e.preventDefault();
			setIndex(i);
			window.history.pushState(null, "", a.pathname);
		};
		const onPop = () => setIndex(null);
		sheet.addEventListener("click", onClick);
		window.addEventListener("popstate", onPop);
		return () => {
			sheet.removeEventListener("click", onClick);
			window.removeEventListener("popstate", onPop);
		};
	}, [sheetId]);

	// Open/close the native dialog (focus trap, Esc and inert background come with it).
	const lastId = useRef<string | null>(null);
	useEffect(() => {
		const d = dialog.current;
		if (!d) return;
		if (index !== null) {
			lastId.current = items.current[index].id;
			if (!d.open) d.showModal();
			document.documentElement.style.overflow = "hidden";
		} else if (d.open) {
			d.close();
			document.documentElement.style.overflow = "";
			const tile = document.querySelector<HTMLAnchorElement>(`#${sheetId} a[href$="/${lastId.current}"]`);
			tile?.focus({ preventScroll: true });
			tile?.scrollIntoView({ block: "nearest" });
		}
	}, [index, sheetId]);

	const close = useCallback(() => window.history.back(), []);
	const go = useCallback((delta: number) => {
		setIndex((i) => {
			if (i === null) return i;
			const next = Math.min(items.current.length - 1, Math.max(0, i + delta));
			if (next !== i) window.history.replaceState(null, "", `/archive/${items.current[next].id}`);
			return next;
		});
	}, []);

	const item = index !== null ? items.current[index] : undefined;
	const total = items.current.length;
	return (
		<dialog
			ref={dialog}
			aria-label="Photo viewer"
			onCancel={(e) => {
				e.preventDefault();
				close();
			}}
			onKeyDown={(e) => {
				if (e.key === "ArrowRight") go(1);
				if (e.key === "ArrowLeft") go(-1);
			}}
			className="m-0 h-dvh max-h-none w-screen max-w-none bg-eigengrau p-0 text-ink backdrop:bg-black/80"
		>
			{item && index !== null && (
				<div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto]">
					<div className="label flex items-center justify-between gap-4 px-4 py-3 text-dim md:px-6">
						<span className="text-safelight">
							{String(index + 1).padStart(3, "0")} / {total}
						</span>
						<a href={`/archive/${item.id}`} className="hover:text-ink">
							Photo page
						</a>
						<button type="button" onClick={close} className="px-2 py-1 hover:text-ink" aria-label="Close viewer">
							Close ✕
						</button>
					</div>
					<div
						className="relative mx-2 mb-2 touch-pan-y md:mx-20"
						onPointerDown={(e) => {
							touchX.current = e.clientX;
						}}
						onPointerUp={(e) => {
							if (touchX.current === null) return;
							const dx = e.clientX - touchX.current;
							touchX.current = null;
							if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
						}}
					>
						<Frame key={item.id} item={item} />
						{index > 0 && <Frame item={items.current[index - 1]} hidden />}
						{index < total - 1 && <Frame item={items.current[index + 1]} hidden />}
					</div>
					<div className="label flex items-center justify-between gap-4 px-4 py-3 text-dim md:px-6">
						<button
							type="button"
							onClick={() => go(-1)}
							disabled={index === 0}
							className="px-2 py-1 hover:text-ink disabled:opacity-30"
						>
							← Prev
						</button>
						<span>{item.date ? DAY.format(new Date(`${item.date}T12:00:00Z`)) : ""}</span>
						<button
							type="button"
							onClick={() => go(1)}
							disabled={index === total - 1}
							className="px-2 py-1 hover:text-ink disabled:opacity-30"
						>
							Next →
						</button>
					</div>
				</div>
			)}
		</dialog>
	);
}
