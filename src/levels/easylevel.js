import { createCluePaths } from "../utils/cluePathGenerator";
import { createGridFromVisual } from "../utils/createGridFromVisual";

const levelId = "easylevel";
const title = `"Getting Started"`;
const secondaryTitle =
	"Hint: the common element between the first two clues is `yellow`";
const pickerLabel = "Tutorial";

const visualGrid = [
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["Y_"], ["E_"], ["L_"], ["L_"], ["O_"], ["W_"]],
	[["##"], ["01"], ["E_"], ["##"], ["02"], ["O_"]],
	[["##"], ["##"], ["O_"], ["##"], ["##"], ["L_"]],
	[["##"], ["##"], ["P_"], ["##"], ["##"], ["F_"]],
	[["##"], ["03"], ["A_"], ["##"], ["##"], ["07"]],
	[["P_"], ["U_"], ["R_"], ["P_"], ["L_"], ["E_"]],
	[["E_"], ["04"], ["D_"], ["##"], ["##"], ["##"]],
	[["A_"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["C_"], ["##"], ["##"], ["##"], ["I_"], ["##"]],
	[["O_"], ["R_"], ["A_"], ["N_"], ["G_"], ["E_"]],
	[["C_"], ["05"], ["##"], ["06"], ["U_"], ["##"]],
	[["K_"], ["##"], ["##"], ["##"], ["A_"], ["##"]],
	[["##"], ["##"], ["T_"], ["A_"], ["N_"], ["##"]],
	[["##"], ["##"], ["##"], ["00"], ["A_"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
];

const numberOfClues = 99;

const easylevel = {
	title,
	secondaryTitle,
	pickerLabel,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default easylevel;
