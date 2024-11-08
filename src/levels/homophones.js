import { createCluePaths } from "../utils/cluePathGenerator";
import { createGridFromVisual } from "../utils/createGridFromVisual";
const levelId = "homophones";
const title = `"Hear here"`;
const secondaryTitle = "";
const pickerLabel = "Level 2";

const visualGrid = [
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["K_"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["N_"], ["I_"], ["G_"], ["H_"], ["T_"], ["##"]],
	[["I_"], ["00"], ["00"], ["##"], ["##"], ["##"]],
	[["G_"], ["00"], ["00"], ["T_"], ["##"], ["##"]],
	[["H_"], ["00"], ["00"], ["I_"], ["##"], ["##"]],
	[["T_"], ["H_"], ["Y_"], ["M_"], ["E_"], ["##"]],
	[["##"], ["##"], ["##"], ["E_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["H_"]],
	[["##"], ["##"], ["F_"], ["##"], ["##"], ["A_"]],
	[["##"], ["##"], ["L_"], ["##"], ["##"], ["I_"]],
	[["F_"], ["L_"], ["O_"], ["W_"], ["E_"], ["R_"]],
	[["##"], ["##"], ["U_"], ["01"], ["01"], ["01"]],
	[["H_"], ["A_"], ["R_"], ["E_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["P_"], ["##"], ["##"]],
	[["##"], ["D_"], ["U_"], ["A_"], ["L_"], ["##"]],
	[["##"], ["U_"], ["02"], ["I_"], ["##"], ["##"]],
	[["P_"], ["E_"], ["A_"], ["R_"], ["S_"], ["##"]],
	[["##"], ["L_"], ["##"], ["S_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["V_"], ["##"]],
	[["##"], ["##"], ["M_"], ["##"], ["A_"], ["##"]],
	[["##"], ["##"], ["U_"], ["##"], ["N_"], ["##"]],
	[["M_"], ["U_"], ["S_"], ["S_"], ["E_"], ["L_"]],
	[["##"], ["##"], ["C_"], ["03"], ["03"], ["##"]],
	[["##"], ["##"], ["L_"], ["03"], ["03"], ["##"]],
	[["##"], ["V_"], ["E_"], ["I_"], ["N_"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
];

const numberOfClues = 99;

const homophones = {
	title,
	secondaryTitle,
	pickerLabel,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default homophones;
