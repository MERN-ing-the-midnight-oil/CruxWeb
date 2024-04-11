// src/levels/level2.js
const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || ""; // Use an empty string as fallback

const level2 = {
	words: [
		{ word: "Chameleon", start: { x: 0, y: 4 }, direction: "across" },
		{ word: "Camouflage", start: { x: 0, y: 4 }, direction: "down" },
		{ word: "Pallet", start: { x: 5, y: 1 }, direction: "down" },
		{ word: "Tree", start: { x: 5, y: 6 }, direction: "across" },
		{ word: "Ruff", start: { x: 6, y: 6 }, direction: "down" },
		{ word: "Frill", start: { x: 6, y: 8 }, direction: "across" }, // Corrected to go across
	],
	intersections: [
		{
			position: { x: 0, y: 4 },
			clues: [
				baseUrl + "/images/level2/clue-chameleon-camouflage-1.webp",
				// Additional clues for "Chameleon" and "Camouflage" intersection
			],
		},
		{
			position: { x: 5, y: 4 },
			clues: [
				baseUrl + "/images/level2/clue-chameleon-pallet-1.webp",
				// Additional clues for "Chameleon" and "Pallet" intersection
			],
		},
		{
			position: { x: 5, y: 6 },
			clues: [
				baseUrl + "/images/level2/clue-tree-pallet-1.webp",
				// Additional clues for "Tree" and "Pallet" intersection
			],
		},
		{
			position: { x: 6, y: 6 },
			clues: [
				baseUrl + "/images/level2/clue-tree-ruff-1.webp",
				// Additional clues for "Tree" and "Ruff" intersection
			],
		},
		{
			position: { x: 6, y: 8 },
			clues: [
				baseUrl + "/images/level2/clue-ruff-frill-1.webp",
				// Additional clues for "Ruff" and "Frill" intersection
			],
		},
		// Additional intersections can be added here if your game expands
	],
};

export default level2;
