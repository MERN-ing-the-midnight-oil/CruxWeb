import React, { useState, useEffect } from "react";
import level1 from "./levels/level1";

const GameBoard = () => {
	const [guesses, setGuesses] = useState({});

	useEffect(() => {
		const initialGuesses = {};
		// Pre-fill the correct answers in the state for comparison (hidden from user initially)
		level1.words.forEach(({ word, start, direction }) => {
			let [x, y] = [start.x + 1, start.y + 1]; // Adjusted for margin
			for (let char of word) {
				const key = `${y}-${x}`;
				initialGuesses[key] = { answer: char.toUpperCase(), guess: "" }; // Store both the correct answer and user guess
				direction === "across" ? x++ : y++;
			}
		});
		setGuesses(initialGuesses);
	}, []);

	// Handle input change by updating the guesses state with the user's input
	const handleInputChange = (e, key) => {
		const newGuess = e.target.value.slice(-1).toUpperCase(); // Ensure uppercase for consistency
		setGuesses((prevGuesses) => ({
			...prevGuesses,
			[key]: { ...prevGuesses[key], guess: newGuess }, // Update only the guess part
		}));
	};

	// Render the game board dynamically based on the level configuration
	const renderGrid = () => {
		let maxX = 0,
			maxY = 0;

		// Determine the grid size dynamically
		Object.keys(guesses).forEach((key) => {
			const [y, x] = key.split("-").map(Number);
			maxX = Math.max(maxX, x);
			maxY = Math.max(maxY, y);
		});

		const grid = [];

		for (let y = 1; y <= maxY; y++) {
			const row = [];
			for (let x = 1; x <= maxX; x++) {
				const key = `${y}-${x}`;
				const cell = guesses[key];
				const isCorrectGuess = cell && cell.guess === cell.answer;
				const cellClass = `grid-cell ${
					cell ? (isCorrectGuess ? "correct-guess" : "word-cell") : "empty-cell"
				}`;

				row.push(
					<input
						key={key}
						type="text"
						className={cellClass}
						value={cell ? cell.guess : ""}
						onChange={(e) => handleInputChange(e, key)}
						maxLength="1"
						disabled={!cell}
					/>
				);
			}
			grid.push(
				<div
					key={y}
					className="grid-row">
					{row}
				</div>
			);
		}

		return grid;
	};

	return <div className="game-board">{renderGrid()}</div>;
};

export default GameBoard;
