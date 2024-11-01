import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import cliches from "./levels/cliches";
import easylevel from "./levels/easylevel";
import homophones from "./levels/homophones";
import colorsandshapes from "./levels/colorsandshapes";
import { getClueColor } from "./utils/getClueColor";
import { checkWordCompletion } from "./utils/checkWordCompletion";

const GameBoard = () => {
	const levels = { cliches, easylevel, homophones, colorsandshapes };
	const [currentLevel, setCurrentLevel] = useState("easylevel");
	const [guesses, setGuesses] = useState({});
	const [showClueModal, setShowClueModal] = useState(false);
	const [currentClueUrl, setCurrentClueUrl] = useState("");
	const modalRef = useRef(null);
	const inputRefs = useRef({});
	const [focusDirection, setFocusDirection] = useState("across");
	const [confettiActive, setConfettiActive] = useState(false);
	const [sparklingCells, setSparklingCells] = useState({});

	useEffect(() => {
		const savedGuesses = localStorage.getItem(`guesses-${currentLevel}`);
		if (savedGuesses) {
			setGuesses(JSON.parse(savedGuesses));
		} else {
			setGuesses({});
		}
	}, [currentLevel]);

	useEffect(() => {
		localStorage.setItem(`guesses-${currentLevel}`, JSON.stringify(guesses));
	}, [guesses, currentLevel]);

	const handleLevelChange = (event) => {
		setCurrentLevel(event.target.value);
		setGuesses({});
		inputRefs.current = {};
	};

	const handleInputChange = (position, event) => {
		const newGuess = event.target.value.toUpperCase().slice(0, 1);
		setGuesses((prevGuesses) => ({
			...prevGuesses,
			[position]: newGuess,
		}));
		moveFocus(position);

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
				const parentCell = event.target.closest("td");
				parentCell.classList.add("sparkle");

				setTimeout(() => {
					parentCell.classList.remove("sparkle");
				}, 1000);
			}
		}
	};

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
		return direction === "across" ? `${row}-${col + 1}` : `${row + 1}-${col}`;
	};

	const isPositionValid = (position) => {
		const [row, col] = position.split("-").map(Number);
		if (row >= levels[currentLevel].grid.length || row < 0) return false;
		if (col >= levels[currentLevel].grid[row].length || col < 0) return false;
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
		let cellStyle = { border: "1px solid #d018bd" };
		let cellClassNames = "letter-cell";
		let inputClassNames = "";

		if (guesses[position] === cell.letter) {
			inputClassNames += " correct";
		}
		if (sparklingCells[position]) {
			cellClassNames += " sparkle";
		}

		if (cell.clue) {
			const clueColor = getClueColor(clueUrl);
			cellStyle = {
				...cellStyle,
				backgroundColor: clueColor,
				border: `1px solid ${clueColor}`,
			};
			return (
				<td
					className="clue-cell"
					style={cellStyle}
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
			{confettiActive && <Confetti />}
			<div className="picker-container">
				<select
					onChange={handleLevelChange}
					value={currentLevel}>
					{Object.keys(levels).map((level) => (
						<option
							key={level}
							value={level}>
							{levels[level].pickerLabel}
						</option>
					))}
				</select>
			</div>
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
