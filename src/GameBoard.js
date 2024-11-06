// GameBoard.js
import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import cliches from "./levels/cliches";
import easylevel from "./levels/easylevel";
import colorsandshapes from "./levels/colorsandshapes";
import homophones from "./levels/homophones";
import { getClueColor } from "./utils/getClueColor";
import { checkWordCompletion } from "./utils/checkWordCompletion";

const GameBoard = () => {
	const levels = { cliches, easylevel, colorsandshapes, homophones };
	const [currentLevel, setCurrentLevel] = useState("easylevel");
	const [guesses, setGuesses] = useState({});
	const [showClueModal, setShowClueModal] = useState(false);
	const [currentClueUrl, setCurrentClueUrl] = useState("");
	const [currentClueKey, setCurrentClueKey] = useState("");
	const modalRef = useRef(null);
	const inputRefs = useRef({});
	const [focusDirection, setFocusDirection] = useState("across");
	const [confettiActive, setConfettiActive] = useState(false);
	const [confettiOrigin, setConfettiOrigin] = useState({ x: 0.5, y: 0.5 });
	const [sparklingCells, setSparklingCells] = useState({});

	// Load saved guesses on level change
	useEffect(() => {
		const savedGuesses = localStorage.getItem(`guesses-${currentLevel}`);
		if (savedGuesses) {
			setGuesses(JSON.parse(savedGuesses));
		} else {
			setGuesses({});
		}
	}, [currentLevel]);

	// Save guesses to local storage
	useEffect(() => {
		const savedGuesses = JSON.stringify(guesses);
		localStorage.setItem(`guesses-${currentLevel}`, savedGuesses);
	}, [guesses, currentLevel]);

	// Prevent default touch behavior when modal is open
	useEffect(() => {
		const handleGlobalTouchStart = (e) => {
			if (showClueModal) e.preventDefault();
		};
		document.addEventListener("touchstart", handleGlobalTouchStart, {
			passive: false,
		});
		return () => {
			document.removeEventListener("touchstart", handleGlobalTouchStart);
		};
	}, [showClueModal]);

	const handleLevelChange = (event) => {
		setCurrentLevel(event.target.value);
		setGuesses({});
		inputRefs.current = {};
	};

	const handleEraseAll = () => {
		setGuesses({});
		localStorage.removeItem(`guesses-${currentLevel}`);
	};

	const handleInputChange = (position, event) => {
		const newGuess = event.target.value.toUpperCase().slice(0, 1);
		const existingGuess = guesses[position] || "";
		setGuesses((prevGuesses) => ({
			...prevGuesses,
			[position]: newGuess,
		}));
		moveFocus(position);

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
					const parentCell = event.target.closest("td");
					parentCell.classList.add("sparkle");
					setTimeout(() => {
						parentCell.classList.remove("sparkle");
					}, 10000);
				}
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

	// Toggle modal state on clue cell click
	const toggleClueModal = (clueUrl, clueKey) => {
		if (showClueModal) {
			// Close modal if it's already open
			setShowClueModal(false);
			setCurrentClueUrl("");
			setCurrentClueKey("");
		} else {
			// Open modal with new clue
			setCurrentClueUrl(clueUrl);
			setCurrentClueKey(clueKey);
			setShowClueModal(true);
		}
	};

	// Render each cell, including clue cells with the modal toggle functionality
	const renderCell = (cell, rowIndex, colIndex) => {
		const position = `${rowIndex}-${colIndex}`;
		const clueUrl = cell.clue ? levels[currentLevel].clues[cell.clue] : null;
		let cellStyle = { border: "1px solid grey" };
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
			cellStyle.backgroundColor = clueColor;

			return (
				<td
					key={position}
					className="clue-cell"
					style={cellStyle}
					onClick={() => toggleClueModal(clueUrl, cell.clue)}
					onContextMenu={(e) => e.preventDefault()} // Prevent long-press context menu on mobile
				></td>
			);
		} else if (cell.empty) {
			return (
				<td
					key={position}
					className="empty-cell"
					style={cellStyle}></td>
			);
		} else {
			return (
				<td
					key={position}
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
			{confettiActive && <Confetti origin={confettiOrigin} />}
			<div className="picker-container">
				<select
					className="level-selector"
					onChange={handleLevelChange}
					value={currentLevel}>
					{Object.keys(levels).map((levelKey) => (
						<option
							key={levelKey}
							value={levelKey}>
							{levels[levelKey].pickerLabel}
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
			// Render the modal with both onClick and onTouchEnd for closing
			{showClueModal && (
				<div
					className="modal-backdrop"
					onMouseDown={() => {
						console.log("Backdrop mouse down"); // Log for mouse down event
						setShowClueModal(false);
					}}
					onTouchStart={() => {
						console.log("Backdrop touched (onTouchStart)"); // Log for mobile touch start
						setShowClueModal(false);
					}}>
					<div
						className="modal-content"
						onClick={(e) => {
							e.stopPropagation();
							console.log("Modal content clicked - propagation stopped");
						}}
						onTouchStart={(e) => {
							e.stopPropagation();
							console.log("Modal content touch start - propagation stopped");
						}}
						style={{ borderColor: getClueColor(currentClueKey) }}>
						<img
							src={currentClueUrl}
							alt="Clue"
							className="modal-image"
							onContextMenu={(e) => e.preventDefault()}
						/>
					</div>
				</div>
			)}
			<div className="button-group">
				<button
					onClick={handleEraseAll}
					className="control-button">
					Erase All
				</button>
				<a
					href="https://apps.apple.com/us/app/alpha-crux/id6641026804"
					target="_blank"
					rel="noopener noreferrer"
					className="control-button">
					Crux on iOS
				</a>
				<a
					href="https://www.linkedin.com/in/rhys-smoker/"
					target="_blank"
					rel="noopener noreferrer"
					className="control-button">
					About Me
				</a>
			</div>
			<img
				src={`${process.env.PUBLIC_URL}/QRCode.png`}
				alt="QR Code"
				className="qr-code"
			/>
		</div>
	);
};

export default GameBoard;
