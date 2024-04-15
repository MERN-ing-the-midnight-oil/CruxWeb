// src/levels/level1.js
const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || ""; // Use an empty string as fallback
console.log("Base URL:", baseUrl); // This logs the base URL for debugging purposes

const level1 = {
	words: [
		{ word: "Butterfly", start: { x: 0, y: 0 }, direction: "across" },
		{ word: "Butter", start: { x: 0, y: 0 }, direction: "down" },
		{ word: "Flywheel", start: { x: 6, y: 0 }, direction: "down" },
	],
	intersections: [
		{
			// Intersection of "Butterfly" and "Butter" at (x: 0, y: 0)
			position: { x: 0, y: 0 },
			clues: [baseUrl + "/images/level1/clue-butterfly-butter-1.webp"],
		},
		{
			// Intersection of "Butterfly" and "Flywheel" at (x: 6, y: 0)
			position: { x: 6, y: 0 },
			clues: [baseUrl + "/images/level1/clue-butterfly-flywheel-1.webp"],
		},
		// Additional intersections can be added here if your game expands
	],
};

export default level1;
