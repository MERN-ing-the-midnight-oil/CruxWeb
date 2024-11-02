import { createCluePaths } from "../utils/cluePathGenerator"; // Updated path to match structure
import { createGridFromVisual } from "../utils/createGridFromVisual"; // Import the utility function

const levelId = "colorsandshapes"; // Unique identifier for this level
const title = `"Rods and Cones."`; // Main title for the level
const secondaryTitle = ""; // Additional instruction text for context
const pickerLabel = "Level 3"; // Label to show in the picker

// Visual representation of the grid
const visualGrid = [
	[["##"], ["##"], ["##"], ["00"], ["G_"], ["##"]],
	[["S_"], ["Q_"], ["U_"], ["A_"], ["R_"], ["E_"]],
	[["01"], ["##"], ["##"], ["##"], ["E_"], ["##"]],
	[["I_"], ["V_"], ["O_"], ["R_"], ["Y_"], ["##"]],
	[["##"], ["I_"], ["04"], ["03"], ["##"], ["##"]],
	[["C_"], ["O_"], ["P_"], ["P_"], ["E_"], ["R_"]],
	[["##"], ["L_"], ["##"], ["##"], ["18"], ["E_"]],
	[["##"], ["E_"], ["05"], ["##"], ["##"], ["C_"]],
	[["S_"], ["T_"], ["A_"], ["R_"], ["##"], ["T_"]],
	[["##"], ["##"], ["02"], ["##"], ["19"], ["A_"]],
	[["##"], ["G_"], ["R_"], ["E_"], ["E_"], ["N_"]],
	[["##"], ["##"], ["##"], ["B_"], ["##"], ["G_"]],
	[["##"], ["07"], ["09"], ["O_"], ["06"], ["L_"]],
	[["##"], ["M_"], ["##"], ["N_"], ["##"], ["E_"]],
	[["N_"], ["A_"], ["V_"], ["Y_"], ["##"], ["##"]],
	[["08"], ["R_"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["O_"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["O_"], ["14"], ["D_"], ["##"], ["13"]],
	[["I_"], ["N_"], ["D_"], ["I_"], ["G_"], ["O_"]],
	[["17"], ["##"], ["##"], ["A_"], ["##"], ["##"]],
	[["S_"], ["A_"], ["L_"], ["M_"], ["O_"], ["N_"]],
	[["##"], ["##"], ["##"], ["O_"], ["##"], ["15"]],
	[["16"], ["C_"], ["O_"], ["N_"], ["E_"], ["15"]],
	[["16"], ["Y_"], ["10"], ["D_"], ["##"], ["##"]],
	[["##"], ["A_"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["N_"], ["##"], ["##"], ["##"], ["##"]],
];

// Define the number of clues available in this level
const numberOfClues = 99;

// Construct the level data
const colorsandshapes = {
	title,
	secondaryTitle,
	pickerLabel,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default colorsandshapes;
