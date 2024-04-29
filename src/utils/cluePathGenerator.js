export const createCluePaths = (basePath, levelId, numClues) => {
	let paths = {};
	for (let i = 0; i < numClues; i++) {
		const clueKey = `clue${String(i).padStart(2, "0")}`; // Formats as 'clue00', 'clue01', etc.
		paths[clueKey] = `${basePath}/images/${levelId}/${clueKey}.webp`;
	}
	return paths;
};
