import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import level1 from "./levels/level1";
import level2 from "./levels/level2";
import { getClueColor } from "./utils/getClueColor";
import { checkWordCompletion } from "./utils/checkWordCompletion";

const GameBoard = () => {
	const levels = { level1, level2 };
	const [currentLevel, setCurrentLevel] = useState("level1");
	const [guesses, setGuesses] = useState({});
	const [showClueModal, setShowClueModal] = useState(false);
	const [currentClueUrl, setCurrentClueUrl] = useState("");
	const modalRef = useRef(null);
	const inputRefs = useRef({});
	const [focusDirection, setFocusDirection] = useState("across");
	const [confettiActive, setConfettiActive] = useState(false);
	const [confettiOrigin, setConfettiOrigin] = useState({ x: 0.5, y: 0.5 });
	const [sparklingCells, setSparklingCells] = useState({});

	// experimenting with DOMTokenList
	useEffect(() => {
		const logTokenLists = () => {
			const cells = document.querySelectorAll(".game-board td"); // Now targeting 'td' instead of 'input'
			for (let i = 0; i < cells.length && i < 12; i++) {
				// Ensures it doesn't go out of bounds if there are fewer than 12 cells
				console.log(`Cell ${i + 1} classes:`, cells[i].classList);
			}
		};

		setTimeout(logTokenLists, 500); // Adjust delay as necessary
	}, []); // Dependency array remains empty to run once after the component mounts

	useEffect(() => {
		const savedGuesses = localStorage.getItem(`guesses-${currentLevel}`);
		if (savedGuesses) {
			setGuesses(JSON.parse(savedGuesses));
		} else {
			setGuesses({});
		}
	}, [currentLevel]);

	useEffect(() => {
		const savedGuesses = JSON.stringify(guesses);
		localStorage.setItem(`guesses-${currentLevel}`, savedGuesses);
	}, [guesses, currentLevel]);

	const handleLevelChange = (event) => {
		setCurrentLevel(event.target.value);
		setGuesses({});
		inputRefs.current = {};
	};
	const handleInputChange = (position, event) => {
		const newGuess = event.target.value.toUpperCase().slice(0, 1);
		const existingGuess = guesses[position] || "";

		// Update guesses state and move focus regardless of whether the guess is new
		setGuesses((prevGuesses) => ({
			...prevGuesses,
			[position]: newGuess,
		}));
		moveFocus(position);

		// Check for word completion only when the new input is different and correct
		if (newGuess !== existingGuess) {
			const [rowIndex, colIndex] = position.split("-").map(Number);
			const correct =
				levels[currentLevel].grid[rowIndex][colIndex].letter === newGuess;
			if (correct) {
				const wordCompleted = checkWordCompletion(
					levels[currentLevel].grid,
					guesses,
					position
				);
				if (wordCompleted) {
					// Apply sparkle to the parent <td> if that's your intent
					const parentCell = event.target.closest("td");
					parentCell.classList.add("sparkle");

					setTimeout(() => {
						parentCell.classList.remove("sparkle");
						console.log("Sparkle class removed"); // Check if class is removed after delay
					}, 10000); // Extended time for testing
				}
			}
		}
	};

	function findCompletedWordCells(position, grid) {
		// This function should return an array of cell positions that form the completed word
		// This is a placeholder for the logic that would actually find these cells based on the game logic
		return [{ row: position.split("-")[0], col: position.split("-")[1] }]; // Simplified for example
	}

	const moveFocus = (currentPosition) => {
		const [row, col] = currentPosition.split("-").map(Number);
		let nextPosition = getNextPosition(row, col, focusDirection);

		if (!isPositionValid(nextPosition)) {
			const newDirection = focusDirection === "across" ? "down" : "across";
			nextPosition = getNextPosition(row, col, newDirection);
			if (isPositionValid(nextPosition)) {
				setFocusDirection(newDirection);
			} else {
				return;
			}
		}

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
		if (row >= levels[currentLevel].grid.length || row < 0) {
			return false;
		}
		if (col >= levels[currentLevel].grid[row].length || col < 0) {
			return false;
		}
		return !levels[currentLevel].grid[row][col].empty;
	};
	const handleTouchStart = (clueUrl, e) => {
		e.stopPropagation();
		setCurrentClueUrl(clueUrl);
		setShowClueModal(true);
	};

	const handleTouchEnd = (e) => {
		e.stopPropagation();
		setShowClueModal(false);
	};
	const renderCell = (cell, rowIndex, colIndex) => {
		const position = `${rowIndex}-${colIndex}`;
		const clueUrl = cell.clue ? levels[currentLevel].clues[cell.clue] : null;
		let cellStyle = {
			borderTop: "1px solid #ccc",
			borderBottom: "1px solid #ccc",
			borderLeft: "1px solid #ccc",
			borderRight: "1px solid #ccc",
		};

		// Define the base class name for the cell and input separately
		let cellClassNames = "letter-cell";
		let inputClassNames = "";

		// Check if the cell's letter matches the guess and assign classes accordingly
		if (guesses[position] === cell.letter) {
			inputClassNames += " correct"; // Apply 'correct' class to the input for the green background
		}

		// Add 'sparkle' class to the cell if it is part of a completed word
		if (sparklingCells[position]) {
			cellClassNames += " sparkle";
		}

		if (cell.clue) {
			const clueColor = getClueColor(clueUrl);
			cellStyle.borderTop = `1px solid ${clueColor}`;
			cellStyle.borderBottom = `1px solid ${clueColor}`;
			cellStyle.borderLeft = `1px solid ${clueColor}`;
			cellStyle.borderRight = `1px solid ${clueColor}`;

			return (
				<td
					className="clue-cell"
					style={{ backgroundColor: clueColor, ...cellStyle }}
					onTouchStart={(e) => handleTouchStart(clueUrl, e)}
					onTouchEnd={handleTouchEnd}
					onMouseDown={(e) => {
						e.stopPropagation();
						setCurrentClueUrl(clueUrl);
						setShowClueModal(true);
					}}
					onMouseUp={(e) => {
						e.stopPropagation();
						setShowClueModal(false);
					}}
					onContextMenu={(e) => e.preventDefault()}></td>
			);
		} else if (cell.empty) {
			return (
				<td
					className="empty-cell"
					style={cellStyle}></td>
			);
		} else {
			return (
				<td
					className={cellClassNames}
					style={cellStyle}>
					<input
						ref={(el) => (inputRefs.current[position] = el)}
						type="text"
						maxLength="1"
						value={guesses[position] || ""}
						onChange={(e) => handleInputChange(position, e)}
						onFocus={(e) => e.target.select()}
						className={inputClassNames}
						disabled={!cell.letter}
					/>
				</td>
			);
		}
	};

	return (
		<div className="game-container">
			{confettiActive && (
				<>
					{console.log("Confetti origin:", confettiOrigin)}
					<Confetti origin={confettiOrigin} />
				</>
			)}
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
			{showClueModal && (
				<div
					ref={modalRef}
					className="clue-modal"
					onTouchEnd={(e) => {
						e.stopPropagation();
						setShowClueModal(false);
					}}
					onMouseUp={(e) => {
						e.stopPropagation();
						setShowClueModal(false);
					}}>
					<img
						src={currentClueUrl}
						alt="Clue"
						style={{ width: "100%", height: "100%", objectFit: "contain" }}
						onContextMenu={(e) => e.preventDefault()}
					/>
				</div>
			)}
		</div>
	);
};

export default GameBoard;
