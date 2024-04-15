// src/levels/level1.js
const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || ""; // Use an empty string as fallback
console.log("Base URL:", baseUrl); // This logs the base URL for debugging purposes

const level1 = {
	words: [
		{ word: "Butterfly", start: { x: 0, y: 0 }, direction: "across" }, // intersects with butter, flywheel
		{ word: "Trolley", start: { x: 0, y: 2 }, direction: "across" }, //intersects with butter, lady
		{ word: "Wheelbarrow", start: { x: 6, y: 3 }, direction: "across" }, //intersects with  flywheel, earthworm, rowboat
		{ word: "Recycle", start: { x: 0, y: 5 }, direction: "across" }, //intersects with butter, lady, flywheel
		{ word: "Boathouse", start: { x: 14, y: 6 }, direction: "across" }, //intersects with rowboat, household
		{ word: "Abacus", start: { x: 14, y: 8 }, direction: "across" }, //intersects with rowboat, household
		{ word: "Wormhole", start: { x: 5, y: 11 }, direction: "across" }, //intersects with earthworm, holiday
		{ word: "Old", start: { x: 18, y: 12 }, direction: "across" }, //intersects with household
		{ word: "Daybreak", start: { x: 9, y: 15 }, direction: "across" }, //intersects with holiday, breakfast

		{ word: "Butter", start: { x: 0, y: 0 }, direction: "down" },
		{ word: "Lady", start: { x: 3, y: 2 }, direction: "down" },
		{ word: "Flywheel", start: { x: 6, y: 0 }, direction: "down" },
		{ word: "Earthworm", start: { x: 8, y: 3 }, direction: "down" },
		{ word: "Rowboat", start: { x: 14, y: 3 }, direction: "down" },
		{ word: "Household", start: { x: 18, y: 6 }, direction: "down" },
		{ word: "Holiday", start: { x: 9, y: 11 }, direction: "down" },
		{ word: "Breakfast", start: { x: 12, y: 15 }, direction: "down" },
	],

	intersections: [
		{
			position: { x: 0, y: 0 },
			clues: [baseUrl + "/images/level1/clue-butterfly-butter.webp"],
		}, // Butterfly intersects Butter
		{
			position: { x: 6, y: 0 },
			clues: [baseUrl + "/images/level1/clue-butterfly-flywheel.webp"],
		}, // Butterfly intersects Flywheel
		{
			position: { x: 3, y: 2 },
			clues: [baseUrl + "/images/level1/clue-trolley-lady.webp"],
		}, // Trolley intersects Lady
		{
			position: { x: 6, y: 3 },
			clues: [baseUrl + "/images/level1/clue-wheelbarrow-flywheel.webp"],
		}, // Wheelbarrow intersects Flywheel
		{
			position: { x: 8, y: 3 },
			clues: [baseUrl + "/images/level1/clue-wheelbarrow-earthworm.webp"],
		}, // Wheelbarrow intersects Earthworm
		{
			position: { x: 14, y: 3 },
			clues: [baseUrl + "/images/level1/clue-wheelbarrow-rowboat.webp"],
		}, // Wheelbarrow intersects Rowboat
		{
			position: { x: 14, y: 6 },
			clues: [baseUrl + "/images/level1/clue-boathouse-rowboat.webp"],
		}, // Boathouse intersects Rowboat
		{
			position: { x: 18, y: 6 },
			clues: [baseUrl + "/images/level1/clue-boathouse-household.webp"],
		}, // Boathouse intersects Household
		{
			position: { x: 14, y: 8 },
			clues: [baseUrl + "/images/level1/clue-abacus-rowboat.webp"],
		}, // Abacus intersects Rowboat
		{
			position: { x: 18, y: 8 },
			clues: [baseUrl + "/images/level1/clue-abacus-household.webp"],
		}, // Abacus intersects Household
		{
			position: { x: 5, y: 11 },
			clues: [baseUrl + "/images/level1/clue-wormhole-earthworm.webp"],
		}, // Wormhole intersects Earthworm
		{
			position: { x: 9, y: 11 },
			clues: [baseUrl + "/images/level1/clue-wormhole-holiday.webp"],
		}, // Wormhole intersects Holiday
		{
			position: { x: 9, y: 15 },
			clues: [baseUrl + "/images/level1/clue-daybreak-holiday.webp"],
		}, // Daybreak intersects Holiday
		{
			position: { x: 12, y: 15 },
			clues: [baseUrl + "/images/level1/clue-daybreak-breakfast.webp"],
		}, // Daybreak intersects Breakfast
		{
			position: { x: 18, y: 12 },
			clues: [baseUrl + "/images/level1/clue-old-household.webp"],
		}, // Old intersects Household
	],
};

export default level1;
