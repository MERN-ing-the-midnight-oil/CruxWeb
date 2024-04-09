import React, { useState, useEffect, useRef } from "react";
import level1 from "./levels/level1";

const GameBoard = () => {
	const [guesses, setGuesses] = useState({});
	const cellRefs = useRef({});

	useEffect(() => {
		const initialGuesses = {};
		level1.words.forEach(({ word, start, direction }) => {
			let [x, y] = [start.x + 1, start.y + 1]; // Adjusted for initial margin
			for (let i = 0; i < word.length; i++) {
				const key = `${y}-${x}`;
				initialGuesses[key] = {
					letter: word[i].toUpperCase(),
					guess: "",
					direction,
				}; // Include direction
				cellRefs.current[key] = React.createRef(); // Initialize refs for each cell
				direction === "across" ? x++ : y++;
			}
		});
		setGuesses(initialGuesses);
	}, []);

	const handleInputChange = (e, currentKey) => {
		const newGuess = e.target.value.slice(-1).toUpperCase();
		setGuesses((prevGuesses) => ({
			...prevGuesses,
			[currentKey]: { ...prevGuesses[currentKey], guess: newGuess },
		}));

		// Focus the next cell
		const direction = guesses[currentKey]?.direction; // Use optional chaining for safety
		const nextKey = getNextCellKey(currentKey, direction);
		if (nextKey && cellRefs.current[nextKey]) {
			cellRefs.current[nextKey].current.focus();
		}
	};

	const getNextCellKey = (currentKey, direction) => {
		const [y, x] = currentKey.split("-").map(Number);
		if (direction === "across") {
			return `${y}-${x + 1}`;
		} else {
			// 'down'
			return `${y + 1}-${x}`;
		}
	};

	const renderGrid = () => {
		const grid = [];
		// Dynamically calculate grid size if necessary, for now assume fixed size
		for (let y = 1; y <= 10; y++) {
			// Adjust grid size as needed
			const row = [];
			for (let x = 1; x <= 10; x++) {
				// Adjust grid size as needed
				const key = `${y}-${x}`;
				const cell = guesses[key];
				const isCorrect = cell?.guess && cell.guess === cell.letter;
				row.push(
					<input
						key={key}
						ref={cellRefs.current[key]}
						type="text"
						className={`grid-cell ${cell ? "" : "unused-cell"} ${
							isCorrect ? "correct-guess" : ""
						}`}
						value={cell?.guess || ""}
						onChange={(e) => handleInputChange(e, key)}
						maxLength="1"
						disabled={!cell}
					/>
				);
			}
			grid.push(
				<div
					key={`row-${y}`}
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
