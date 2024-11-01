// src/utils/createGridFromVisual.js

export const createGridFromVisual = (visualGrid) => {
	return visualGrid.map((row) =>
		row.map((cell) => {
			const content = cell[0];
			if (content === "##") return { empty: true };
			if (content.match(/^\d\d$/)) return { clue: `clue${content}` };
			if (content.endsWith("_")) return { letter: content[0] };
			return { empty: true };
		})
	);
};
