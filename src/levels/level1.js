// src/levels/level1.js
const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || ""; // Use an empty string as fallback

const level1 = {
	words: [
		{ word: "ship", start: { x: 0, y: 0 }, direction: "across" },
		{ word: "package", start: { x: 3, y: 0 }, direction: "down" },
	],
	intersections: [
		{
			// Assuming "ship" and "package" intersect at the letter "p",
			// and the intersection is at (x: 3, y: 0) based on "ship" starting at (0,0) and "package" at (3,0).
			position: { x: 3, y: 0 },
			clues: [
				baseUrl + "images/level1/clue-ship-package-1.webp",
				baseUrl + "images/level1/clue-ship-package-2.webp",
			],
		},
		// Additional intersections can be added here if your game expands
	],
};

export default level1;
