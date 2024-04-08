// src/levels/level1.js

const level1 = {
	words: [
		{ word: "ship", start: { x: 0, y: 0 }, direction: "across" },
		{ word: "package", start: { x: 3, y: 0 }, direction: "down" },
	],
	// For now, we're commenting out the intersections to focus on rendering the words
	// intersections: [
	//   {
	//     words: ["ship", "package"],
	//     position: { x: 3, y: 0 },
	//     clues: [
	//       "/images/clue-ship-package-1.webp",
	//       "/images/clue-ship-package-2.webp",
	//     ],
	//   },
	//   // Additional intersections can be added here
	// ],
};

export default level1;
