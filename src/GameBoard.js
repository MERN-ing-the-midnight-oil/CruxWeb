import React, { useState, useEffect, useRef } from "react";
import level1 from "./levels/level1";
import level2 from "./levels/level2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const GameBoard = () => {
	const [currentLevel, setCurrentLevel] = useState(level1);

	const [guesses, setGuesses] = useState({});
	const [selectedClues, setSelectedClues] = useState([]);

	const cellRefs = useRef({});
	const [activeWordStart, setActiveWordStart] = useState(null);

	useEffect(() => {
		const initialGuesses = {};
		currentLevel.words.forEach(({ word, start, direction }) => {
			let [x, y] = [start.x + 1, start.y + 1];
			for (let i = 0; i < word.length; i++) {
				const key = `${y}-${x}`;
				initialGuesses[key] = {
					letter: word[i].toUpperCase(),
					guess: "",
					direction,
				};
				cellRefs.current[key] = React.createRef();
				direction === "across" ? x++ : y++;
			}
		});
		setGuesses(initialGuesses);
	}, [currentLevel]);

	const handleInputChange = (e, currentKey) => {
		const newGuess = e.target.value.slice(-1).toUpperCase();
		setGuesses((prevGuesses) => ({
			...prevGuesses,
			[currentKey]: { ...prevGuesses[currentKey], guess: newGuess },
		}));

		const direction = guesses[currentKey]?.direction;
		const nextKey = getNextCellKey(currentKey, direction);

		// Only focus the next cell if it's part of the active word
		if (nextKey && isActiveWordKey(nextKey)) {
			cellRefs.current[nextKey]?.current?.focus();
		}
	};

	// Add onFocus handler to set active word when user clicks into a cell
	const handleFocus = (key) => {
		if (!isActiveWordKey(key)) {
			setActiveWordStart(key);
		}
	};

	// Helper function to determine if a key is part of the active word
	const isActiveWordKey = (key) => {
		if (!activeWordStart) return false;
		const [startY, startX] = activeWordStart.split("-").map(Number);
		const [keyY, keyX] = key.split("-").map(Number);
		const activeWord = guesses[activeWordStart];

		if (
			activeWord.direction === "across" &&
			startY === keyY &&
			keyX >= startX
		) {
			return true;
		} else if (
			activeWord.direction === "down" &&
			startX === keyX &&
			keyY >= startY
		) {
			return true;
		}
		return false;
	};

	const getNextCellKey = (currentKey, direction) => {
		const [y, x] = currentKey.split("-").map(Number);

		if (direction === "across") {
			return `${y}-${x + 1}`;
		} else {
			// Assuming the only other direction is "down"
			return `${y + 1}-${x}`;
		}
	};

	const handleClueIconClick = (clues) => {
		console.log("Clues:", clues); // Check what clues are actually passed
		setSelectedClues(clues);
	};

	const renderGrid = () => {
		const grid = [];
		for (let y = 1; y <= 10; y++) {
			const row = [];
			for (let x = 1; x <= 10; x++) {
				const key = `${y}-${x}`;
				const cell = guesses[key];
				// Dynamically check against currentLevel intersections
				const isIntersection = currentLevel.intersections.some(
					(intersection) =>
						intersection.position.x + 1 === x &&
						intersection.position.y + 1 === y
				);

				if (isIntersection) {
					const intersectionDetails = currentLevel.intersections.find(
						(intersection) =>
							intersection.position.x + 1 === x &&
							intersection.position.y + 1 === y
					);
					if (intersectionDetails) {
						console.log("Intersection details:", intersectionDetails);
					}
				}

				const isCorrectGuess = cell && cell.guess === cell.letter;

				row.push(
					<div
						key={key}
						className={`grid-cell ${isIntersection ? "intersection" : ""} ${
							isCorrectGuess ? "correct-guess" : ""
						}`}>
						{isIntersection && (
							<button
								className="clue-icon"
								onClick={() =>
									handleClueIconClick(
										currentLevel.intersections.find(
											(intersection) =>
												intersection.position.x + 1 === x &&
												intersection.position.y + 1 === y
										).clues
									)
								}
								style={{ position: "absolute", zIndex: 2 }}>
								<FontAwesomeIcon icon={faSearch} />
							</button>
						)}
						<input
							ref={cellRefs.current[key]}
							type="text"
							className={`input ${cell ? "" : "unused-cell"}`}
							value={cell?.guess || ""}
							onChange={(e) => handleInputChange(e, key)}
							onFocus={() => handleFocus(key)}
							maxLength="1"
							disabled={!cell}
							style={{ zIndex: 1 }}
						/>
					</div>
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

	return (
		<div className="game-container">
			<div className="level-selection">
				<button onClick={() => setCurrentLevel(level1)}>Level 1</button>
				<button onClick={() => setCurrentLevel(level2)}>Level 2</button>
			</div>
			<div className="game-board">{renderGrid()}</div>
			<div className="clue-display-area">
				{selectedClues.map((clue, index) => (
					<img
						key={index}
						src={clue}
						alt={`Clue ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default GameBoard;
