import React, { useState, useRef, useEffect } from "react";
import level1 from "./levels/level1";

const GameBoard = () => {
	const [grid, setGrid] = useState(
		level1.grid.map((row) =>
			row.map((cell) => (cell && cell.letter ? { ...cell, letter: "" } : cell))
		)
	); // Initialize letter cells as empty
	const [selectedClue, setSelectedClue] = useState(null);
	const inputRefs = useRef(new Map());
	const [currentFocus, setCurrentFocus] = useState(null);

	useEffect(() => {
		console.log("Effect running for focus change:", currentFocus);
		if (currentFocus) {
			const { rowIndex, cellIndex } = currentFocus;
			const nextCellIndex = cellIndex + 1;
			if (
				nextCellIndex < grid[rowIndex].length &&
				grid[rowIndex][nextCellIndex]?.letter !== undefined
			) {
				const nextInputRef = inputRefs.current.get(
					`${rowIndex}-${nextCellIndex}`
				);
				if (nextInputRef) {
					nextInputRef.focus();
					console.log("Focusing next cell:", rowIndex, nextCellIndex);
				}
			}
		}
	}, [currentFocus, grid]);

	const handleCellClick = (cell, rowIndex, cellIndex) => {
		if (!cell || !cell.letter) return; // Ignore clicks on empty or clue cells
		inputRefs.current.get(`${rowIndex}-${cellIndex}`).focus();
	};

	const handleKeyDown = (event, rowIndex, cellIndex) => {
		const key = event.key.toUpperCase();
		if (key.length === 1 && /[A-Z]/.test(key)) {
			console.log("Key down detected:", key);
			// Update the cell immediately with the new character
			const updatedGrid = grid.map((row, ri) =>
				row.map((cell, ci) => {
					if (ri === rowIndex && ci === cellIndex && cell) {
						return { ...cell, letter: key };
					}
					return cell;
				})
			);
			setGrid(updatedGrid);

			// Prepare to move focus to the next letter cell
			setCurrentFocus({ rowIndex, cellIndex });

			// Prevent default to avoid the key being added twice
			event.preventDefault();
		}
	};

	const getCellStyle = (cell, rowIndex, cellIndex) => {
		if (!cell) return { backgroundColor: "darkgrey" }; // Inactive cells background
		if (cell.clue) return { backgroundColor: "lightblue" }; // Clue cells background
		const correctLetter = level1.grid[rowIndex][cellIndex]?.letter; // Retrieve the correct letter from the initial state
		return {
			backgroundColor:
				cell.letter && cell.letter === correctLetter ? "green" : "white", // Change to green if correct
		};
	};

	return (
		<div>
			<div className="grid">
				{grid.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className="row">
						{row.map((cell, cellIndex) => (
							<div
								key={cellIndex}
								className="cell"
								style={getCellStyle(cell, rowIndex, cellIndex)}
								onClick={() => handleCellClick(cell, rowIndex, cellIndex)}>
								{cell && cell.letter !== undefined ? (
									<input
										type="text"
										value={cell.letter || ""}
										onKeyDown={(e) => handleKeyDown(e, rowIndex, cellIndex)}
										maxLength="1"
										ref={(el) =>
											inputRefs.current.set(`${rowIndex}-${cellIndex}`, el)
										}
									/>
								) : (
									""
								)}
							</div>
						))}
					</div>
				))}
			</div>
			{selectedClue && (
				<div className="clue-display">
					<img
						src={selectedClue}
						alt="Clue"
					/>
				</div>
			)}
		</div>
	);
};

export default GameBoard;

// Include basic styles for the grid
const style = document.createElement("style");
style.textContent = `
  .grid { display: flex; flex-direction: column; }
  .row { display: flex; }
  .cell { width: 40px; height: 40px; border: 1px solid black; display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .cell input { width: 100%; height: 100%; text-align: center; border: none; background: transparent; font-size: large; }
  .clue-display { margin-top: 20px; }
`;
document.head.appendChild(style);
