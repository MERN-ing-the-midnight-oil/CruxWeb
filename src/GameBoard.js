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
	const [modalClueColor, setModalClueColor] = useState(""); // State to store the modal color
	const inputRefs = useRef({});
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
	};

	const moveFocus = (currentPosition) => {
		const [row, col] = currentPosition.split("-").map(Number);
		let nextPosition = getNextPosition(row, col, "across");
		if (inputRefs.current[nextPosition]) {
			inputRefs.current[nextPosition].focus();
		}
	};

	const getNextPosition = (row, col, direction) => {
		return direction === "across" ? `${row}-${col + 1}` : `${row + 1}-${col}`;
	};

	const toggleClueModal = (clueUrl, clueColor) => {
		if (showClueModal) {
			// Close the modal
			setShowClueModal(false);
			setCurrentClueUrl("");
			setModalClueColor(""); // Reset modal color
		} else {
			// Open the modal with the provided clue URL and color
			setCurrentClueUrl(clueUrl);
			setShowClueModal(true);
			setModalClueColor(clueColor); // Set modal color from the clicked cell
		}
	};

	const renderCell = (cell, rowIndex, colIndex) => {
		const position = `${rowIndex}-${colIndex}`;
		const clueUrl = cell.clue ? levels[currentLevel].clues[cell.clue] : null;
		const clueColor = cell.clue ? getClueColor(cell.clue) : null;
		let cellStyle = { border: "1px solid grey" };

		if (cell.clue) {
			cellStyle.backgroundColor = clueColor;

			return (
				<td
					key={position}
					className="clue-cell"
					style={cellStyle}
					onMouseDown={() => toggleClueModal(clueUrl, clueColor)}
					onContextMenu={(e) => e.preventDefault()} // Prevent context menu
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
					className="letter-cell"
					style={cellStyle}>
					<input
						ref={(el) => (inputRefs.current[position] = el)}
						type="text"
						maxLength="1"
						value={guesses[position] || ""}
						onChange={(e) => handleInputChange(position, e)}
						onFocus={(e) => e.target.select()}
						className={guesses[position] === cell.letter ? "correct" : ""}
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
			{levels[currentLevel].secondaryTitle && (
				<h2 className="secondary-title">
					{levels[currentLevel].secondaryTitle}
				</h2>
			)}
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
					className="modal-backdrop"
					onMouseDown={() => setShowClueModal(false)}
					onTouchStart={() => setShowClueModal(false)}>
					<div
						className="modal-content"
						style={{
							borderColor: modalClueColor,
							backgroundColor: modalClueColor,
						}}
						onClick={() => setShowClueModal(false)}
						onTouchStart={() => setShowClueModal(false)}>
						<img
							src={currentClueUrl}
							alt="Clue"
							className="modal-image"
							onContextMenu={(e) => e.preventDefault()}
						/>
					</div>
				</div>
			)}

			<div className="qr-container">
				<img
					src={`${process.env.PUBLIC_URL}/QRCode.png`}
					alt="QR Code"
					className="qr-code"
				/>
				<p
					style={{
						textAlign: "center",
						marginTop: "10px",
						fontSize: "1rem",
						color: "#333",
					}}>
					Scan to Visit
				</p>
			</div>
			<div className="button-group">
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
					Hire Me
				</a>
			</div>
		</div>
	);
};

export default GameBoard;
