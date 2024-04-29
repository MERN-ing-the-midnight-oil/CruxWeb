import React, { useState, useRef, useEffect } from "react";
import ColorHash from "color-hash";
import level1 from "./levels/level1";
import level2 from "./levels/level2";

const colorHash = new ColorHash();
const getClueColor = (clueUrl) => {
	return colorHash.hex(clueUrl); // Returns a hex color based on the input string
};
const GameBoard = () => {
	const levels = { level1, level2 };
	const [currentLevel, setCurrentLevel] = useState("level1");
	const [guesses, setGuesses] = useState({});

	// Load guesses from local storage when the component mounts or level changes
	useEffect(() => {
		const savedGuesses = localStorage.getItem(`guesses-${currentLevel}`);
		if (savedGuesses) {
			setGuesses(JSON.parse(savedGuesses));
		} else {
			setGuesses({});
		}
	}, [currentLevel]);

	// Save guesses to local storage whenever they change
	useEffect(() => {
		const savedGuesses = JSON.stringify(guesses);
		localStorage.setItem(`guesses-${currentLevel}`, savedGuesses);
	}, [guesses, currentLevel]);

	const [focusDirection, setFocusDirection] = useState("across"); // 'across' or 'down'
	const inputRefs = useRef({});
	const [currentClueUrl, setCurrentClueUrl] = useState("");

	const handleLevelChange = (event) => {
		setCurrentLevel(event.target.value);
		setGuesses({});
		inputRefs.current = {}; // Reset references on level change
	};

	const handleInputChange = (position, event) => {
		const guess = event.target.value.toUpperCase().slice(0, 1); // Take only the first character, if any
		setGuesses({ ...guesses, [position]: guess });
		if (guess.length === 1) {
			moveFocus(position);
		}
	};

	const moveFocus = (currentPosition) => {
		const [row, col] = currentPosition.split("-").map(Number);
		let nextPosition = getNextPosition(row, col, focusDirection);

		// Try to move in the current direction first
		if (!isPositionValid(nextPosition)) {
			// Switch direction if the next position in the current direction is invalid (out of bounds)
			const newDirection = focusDirection === "across" ? "down" : "across";
			nextPosition = getNextPosition(row, col, newDirection);
			if (isPositionValid(nextPosition)) {
				setFocusDirection(newDirection); // Update the direction if switched successfully
			} else {
				// If neither direction is valid, do not change focus
				return;
			}
		}

		// Focus the next cell, even if it's filled (allowing overwriting)
		if (inputRefs.current[nextPosition]) {
			inputRefs.current[nextPosition].focus();
		}
	};

	const getNextPosition = (row, col, direction) => {
		if (direction === "across") {
			return `${row}-${col + 1}`;
		} else {
			return `${row + 1}-${col}`;
		}
	};

	const isPositionValid = (position) => {
		const [row, col] = position.split("-").map(Number);
		// First check if the row exists
		if (row >= levels[currentLevel].grid.length || row < 0) {
			return false;
		}
		// Then check if the column exists in the row
		if (col >= levels[currentLevel].grid[row].length || col < 0) {
			return false;
		}
		// Finally, check if the cell is not marked as empty
		return !levels[currentLevel].grid[row][col].empty;
	};

	const renderCell = (cell, rowIndex, colIndex) => {
		const position = `${rowIndex}-${colIndex}`;
		const grid = levels[currentLevel].grid; // Correctly define grid from the levels object
		const clueUrl = cell.clue ? levels[currentLevel].clues[cell.clue] : null;
		let cellStyle = {};

		// Check neighboring cells for the same clue to adjust borders
		const checkNeighbor = (offsetRow, offsetCol) => {
			const neighborRow = rowIndex + offsetRow;
			const neighborCol = colIndex + offsetCol;
			if (
				neighborRow >= 0 &&
				neighborRow < grid.length &&
				neighborCol >= 0 &&
				neighborCol < grid[neighborRow].length
			) {
				const neighbor = grid[neighborRow][neighborCol];
				return (
					neighbor.clue && levels[currentLevel].clues[neighbor.clue] === clueUrl
				);
			}
			return false;
		};

		// Adjust borders based on neighboring cells
		if (clueUrl) {
			cellStyle.borderTop = checkNeighbor(-1, 0) ? "none" : "1px solid #ccc";
			cellStyle.borderBottom = checkNeighbor(1, 0) ? "none" : "1px solid #ccc";
			cellStyle.borderLeft = checkNeighbor(0, -1) ? "none" : "1px solid #ccc";
			cellStyle.borderRight = checkNeighbor(0, 1) ? "none" : "1px solid #ccc";
		}

		if (cell.empty) {
			return <td className="empty-cell"></td>;
		}
		if (cell.clue) {
			const clueColor = getClueColor(clueUrl);
			return (
				<td
					className="clue-cell"
					style={{ backgroundColor: clueColor, ...cellStyle }}
					onClick={() => setCurrentClueUrl(clueUrl)} // Assuming setCurrentClueUrl is defined to handle clue clicks
				></td>
			);
		}
		const correct = guesses[position] === cell.letter;
		if (cell.letter) {
			return (
				<td
					className={correct ? "letter-cell correct" : "letter-cell"}
					style={{ ...cellStyle }}>
					<input
						ref={(el) => (inputRefs.current[position] = el)}
						type="text"
						maxLength="1"
						value={guesses[position] || ""}
						onChange={(e) => handleInputChange(position, e)}
						onFocus={(e) => e.target.select()} // Automatically select text when focused
						onClick={(e) => e.target.select()} // Also select text on click to ensure overwrite capability
						className={correct ? "correct" : ""}
						disabled={false} // Ensure input is always enabled
					/>
				</td>
			);
		}
	};

	return (
		<div className="game-container">
			<select
				className="level-selector"
				onChange={handleLevelChange}
				value={currentLevel}>
				{Object.keys(levels).map((level) => (
					<option
						key={level}
						value={level}>
						{level}
					</option>
				))}
			</select>
			<h1>{levels[currentLevel].title}</h1>
			<table className="game-board">
				<tbody>
					{levels[currentLevel].grid.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, colIndex) =>
								renderCell(cell, rowIndex, colIndex)
							)}
						</tr>
					))}
				</tbody>
			</table>
			<div
				style={{
					width: "100%",
					height: "auto",
					maxWidth: "600px",
					marginTop: "20px",
				}}>
				{currentClueUrl && (
					<img
						src={currentClueUrl}
						alt="Clue"
						style={{ width: "100%", height: "100%", objectFit: "contain" }}
					/>
				)}
			</div>
		</div>
	);
};

export default GameBoard;
