// src/levels/level1.js
const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || ""; // Base URL for images

// Define the visual representation of the grid
// prettier-ignore
const visualGrid = [
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],

	[["##"], ["A_"], ["P_"], ["P_"], ["L_"], ["E_"], ["##"], ["##"], ["##"], ["##"]],

	[["##"], ["##"], ["00"], ["00"], ["00"], ["00"], ["00"], ["##"], ["##"], ["##"]],

	[["##"], ["##"], ["00"], ["##"], ["##"], ["##"], ["00"], ["##"], ["##"], ["##"]],

	[["##"], ["##"], ["00"], ["##"], ["##"], ["##"], ["00"], ["##"], ["##"], ["##"]],

	[["##"], ["##"], ["00"], ["##"], ["##"], ["##"], ["00"], ["##"], ["##"], ["##"]],

	[["##"], ["##"], ["00"], ["##"], ["##"], ["##"], ["00"], ["##"], ["##"], ["##"]],

	[["##"], ["##"], ["00"], ["00"], ["00"], ["00"], ["00"], ["##"], ["##"], ["##"]],

	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],

	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"]]
  ];

function createGridFromVisual(visualGrid) {
	return visualGrid.map((row) => {
		// Skip processing for empty rows
		if (row.length === 0) {
			return [];
		}
		return row.map((cell) => {
			const content = cell[0];
			if (content === "##") return null; // Empty cell
			if (content.match(/^\d\d$/)) {
				// Matches two digits representing a clue
				return { clue: `clue${content}` }; // Create a clue cell
			}
			if (content.endsWith("_")) {
				// Check if content ends with an underscore, indicating a letter
				return { letter: content[0] }; // Extract the letter, discarding the underscore
			}
			return null; // Default case for undefined types
		});
	});
}

const level1 = {
	grid: createGridFromVisual(visualGrid),
	clues: {
		clue00: `${baseUrl}/images/butter-butterfly.webp`, // Specific image for a clue
	},
};

export default level1;
