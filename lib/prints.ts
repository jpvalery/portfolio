// Darkroom chapter pages show one print after another. Two portraits in a row
// share a row on wide screens, so a tall frame never stands alone in a wide gap.

export type PrintItem = { id: string; width: number; height: number };
export type PrintRow = { kind: "single"; photo: PrintItem } | { kind: "pair"; photos: [PrintItem, PrintItem] };

export const isPortrait = (p: { width: number; height: number }) => p.height > p.width * 1.05;

export function printRows(items: PrintItem[]): PrintRow[] {
	const rows: PrintRow[] = [];
	for (let i = 0; i < items.length; i++) {
		const cur = items[i];
		const next = items[i + 1];
		if (isPortrait(cur) && next && isPortrait(next)) {
			rows.push({ kind: "pair", photos: [cur, next] });
			i++;
		} else {
			rows.push({ kind: "single", photo: cur });
		}
	}
	return rows;
}
