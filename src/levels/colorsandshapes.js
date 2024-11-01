import { createCluePaths } from "../utils/cluePathGenerator";
import { createGridFromVisual } from "../utils/createGridFromVisual";

const levelId = "colorsandshapes";
const title = `"Colors and Shapes"`;
const secondaryTitle =
	"Match clues based on colors and shapes to reveal the hidden words.";
const pickerLabel = "Colors & Shapes";

const visualGrid = [
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["R_"], ["E_"], ["D_"], ["##"], ["##"]],
	[["##"], ["##"], ["C_"], ["##"], ["S_"], ["##"]],
	[["B_"], ["L_"], ["U_"], ["E_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["C_"], ["I_"]],
	[["##"], ["##"], ["O_"], ["##"], ["R_"], ["C_"]],
	[["P_"], ["U_"], ["R_"], ["P_"], ["L_"], ["E_"]],
	[["##"], ["##"], ["##"], ["Y_"], ["E_"], ["L_"]],
	[["##"], ["##"], ["O_"], ["##"], ["L_"], ["L_"]],
	[["##"], ["S_"], ["Q_"], ["U_"], ["A_"], ["R_"]],
	[["##"], ["C_"], ["I_"], ["R_"], ["C_"], ["L_"]],
	[["##"], ["T_"], ["R_"], ["I_"], ["A_"], ["N_"]],
	[["G_"], ["L_"], ["E_"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
];

const numberOfClues = 99;
const colorsandshapes = {
	title,
	secondaryTitle,
	pickerLabel,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default colorsandshapes;
