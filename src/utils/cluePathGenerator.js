export const createCluePaths = (levelId, numClues) => {
	const basePath = process.env.PUBLIC_URL || ""; // Base path for public directory compatibility
	const paths = {}; // Ensure `paths` is defined properly

	for (let i = 0; i < numClues; i++) {
		const clueKey = `clue${String(i).padStart(2, "0")}`; // Formats as 'clue00', 'clue01', etc.
		paths[clueKey] = `${basePath}/images/${levelId}/${clueKey}.jpeg`; // Absolute path for images
	}

	return paths;
};
