import React, { useState, useRef, useEffect } from "react";
import level1 from "./levels/level1";

import level2 from "./levels/level2";

import { getClueColor } from "./utils/getClueColor";

// Main GameBoard component
const GameBoard = () => {
	// State definitions
	const levels = { level1, level2 }; // Maps level names to their data
	const [currentLevel, setCurrentLevel] = useState("level1"); // Tracks the currently active level
	const [guesses, setGuesses] = useState({}); // Stores the players' guesses for each cell
	const [showClueModal, setShowClueModal] = useState(false); // Controls whether the clue modal is visible
	const [currentClueUrl, setCurrentClueUrl] = useState(""); // Stores the URL of the currently displayed clue
	const modalRef = useRef(null); // Ref for the modal element to control focus
	const inputRefs = useRef({}); // Refs for each input element in the grid for managing focus
	const [focusDirection, setFocusDirection] = useState("across"); // Tracks the current direction of focus movement, 'across' or 'down'

	// Effect for loading and saving guesses to local storage
	useEffect(() => {
		const savedGuesses = localStorage.getItem(`guesses-${currentLevel}`); // Retrieve saved guesses from local storage
		if (savedGuesses) {
			setGuesses(JSON.parse(savedGuesses)); // Parse and set saved guesses if available
		} else {
			setGuesses({}); // Reset guesses if none are saved
		}
	}, [currentLevel]); // This effect runs when currentLevel changes

	// Effect for saving guesses to local storage whenever guesses or currentLevel changes
	useEffect(() => {
		const savedGuesses = JSON.stringify(guesses); // Convert current guesses to a string
		localStorage.setItem(`guesses-${currentLevel}`, savedGuesses); // Save the stringified guesses to local storage
	}, [guesses, currentLevel]);

	// Handles level change
	const handleLevelChange = (event) => {
		setCurrentLevel(event.target.value); // Set the current level based on user selection
		setGuesses({}); // Reset guesses
		inputRefs.current = {}; // Reset input references
	};

	// Handles changes to input fields in the crossword grid
	const handleInputChange = (position, event) => {
		const guess = event.target.value.toUpperCase().slice(0, 1); // Capture the first character of the input, convert to uppercase
		setGuesses({ ...guesses, [position]: guess }); // Update guesses state
		moveFocus(position); // Move focus based on current position
	};

	// Function to determine the next position for moving focus
	const moveFocus = (currentPosition) => {
		const [row, col] = currentPosition.split("-").map(Number); // Split the position string to get row and column indices
		let nextPosition = getNextPosition(row, col, focusDirection); // Get the next position based on current direction

		if (!isPositionValid(nextPosition)) {
			// Check if the next position is valid
			const newDirection = focusDirection === "across" ? "down" : "across"; // Change direction if the next position is not valid
			nextPosition = getNextPosition(row, col, newDirection); // Get new position in the new direction
			if (isPositionValid(nextPosition)) {
				setFocusDirection(newDirection); // Update the focus direction if the new position is valid
			} else {
				return; // Exit if no valid position is found
			}
		}

		if (inputRefs.current[nextPosition]) {
			inputRefs.current[nextPosition].focus(); // Set focus to the next valid input element
		}
	};

	// Helper function to get the next position based on current row, column, and direction
	const getNextPosition = (row, col, direction) => {
		if (direction === "across") {
			return `${row}-${col + 1}`; // Move right for 'across'
		} else {
			return `${row + 1}-${col}`; // Move down for 'down'
		}
	};

	// Checks if a given position is valid within the grid
	const isPositionValid = (position) => {
		const [row, col] = position.split("-").map(Number); // Split the position into row and column
		if (row >= levels[currentLevel].grid.length || row < 0) {
			return false; // Return false if row is out of grid bounds
		}
		if (col >= levels[currentLevel].grid[row].length || col < 0) {
			return false; // Return false if column is out of grid bounds
		}
		return !levels[currentLevel].grid[row][col].empty; // Return true if the cell is not empty
	};

	// Handles the start of a touch event on a clue cell
	const handleTouchStart = (clueUrl, e) => {
		e.stopPropagation(); // Prevent the event from bubbling up
		setCurrentClueUrl(clueUrl); // Set the current clue URL
		setShowClueModal(true); // Show the clue modal
	};

	// Handles the end of a touch event
	const handleTouchEnd = (e) => {
		e.stopPropagation(); // Prevent the event from bubbling up
		setShowClueModal(false); // Hide the clue modal
	};

	// Renders each cell in the grid
	const renderCell = (cell, rowIndex, colIndex) => {
		const position = `${rowIndex}-${colIndex}`; // Construct the position identifier
		const clueUrl = cell.clue ? levels[currentLevel].clues[cell.clue] : null; // Get the clue URL if the cell is a clue cell
		let cellStyle = {
			borderTop: "1px solid #ccc", // Set default cell border style
			borderBottom: "1px solid #ccc",
			borderLeft: "1px solid #ccc",
			borderRight: "1px solid #ccc",
		};

		if (cell.clue) {
			const clueColor = getClueColor(clueUrl); // Get the background color for the clue cell
			cellStyle.borderTop = `1px solid ${clueColor}`; // Set all borders to the same color as the background
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
			const correct = guesses[position] === cell.letter; // Check if the guessed letter is correct
			return (
				<td
					className={correct ? "letter-cell correct" : "letter-cell"}
					style={cellStyle}>
					<input
						ref={(el) => (inputRefs.current[position] = el)}
						type="text"
						maxLength="1"
						value={guesses[position] || ""}
						onChange={(e) => handleInputChange(position, e)}
						onFocus={(e) => e.target.select()}
						className={correct ? "correct" : ""}
						disabled={!cell.letter}
					/>
				</td>
			);
		}
	};

	// Main component render method
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
