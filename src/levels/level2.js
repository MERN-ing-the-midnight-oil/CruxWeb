// src/levels/level2.js
import { createCluePaths } from "../utils/cluePathGenerator";

const levelId = "level2"; // Unique identifier for each level
const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || ""; // Base URL for images

// function createCluePaths(basePath, levelId) {
// 	return {
// 		clue00: `${basePath}/${levelId}/clue00.webp`,
// 		clue01: `${basePath}/${levelId}/clue01.webp`,
// 		clue02: `${basePath}/${levelId}/clue02.webp`,
// 		clue03: `${basePath}/${levelId}/clue03.webp`,
// 	};
// }

// Define the visual representation of the grid
// prettier-ignore
const visualGrid = [
	[["T_"], ["W_"], ["O_"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["T_"], ["W_"], ["O_"], ["03"], ["03"], ["##"], ["##"], ["##"], ["01"]],
	[["##"], ["##"], ["00"], ["00"], ["00"], ["00"], ["00"], ["##"], ["##"], ["01"]],
	[["##"], ["##"], ["00"], ["##"], ["##"], ["##"], ["00"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["00"], ["##"], ["##"], ["##"], ["00"], ["##"], ["##"], ["##"]],
];

function createGridFromVisual(visualGrid) {
	return visualGrid.map((row) => {
		if (row.length === 0) {
			return [];
		}
		return row.map((cell) => {
			const content = cell[0];
			if (content === "##") {
				return { empty: true };
			}
			if (content.match(/^\d\d$/)) {
				return { clue: `clue${content}` };
			}
			if (content.endsWith("_")) {
				return { letter: content[0] };
			}
			return { empty: true };
		});
	});
}

const numberOfClues = 4;
const level2 = {
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(baseUrl, levelId, numberOfClues),
};

export default level2;
