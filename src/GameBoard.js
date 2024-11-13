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
	const [modalClueColor, setModalClueColor] = useState("");
	const inputRefs = useRef({});
	const [focusDirection, setFocusDirection] = useState("across"); // Track focus direction
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

		// Set focus direction based on word type (horizontal or vertical)
		const [row, col] = position.split("-").map(Number);
		const isVertical = checkIfWordIsVertical(row, col);
		setFocusDirection(isVertical ? "down" : "across");

		moveFocus(position);
	};

	const moveFocus = (currentPosition) => {
		const [row, col] = currentPosition.split("-").map(Number);

		let nextPosition;
		if (focusDirection === "across") {
			nextPosition = getNextPosition(row, col, "across");
			if (inputRefs.current[nextPosition]) {
				inputRefs.current[nextPosition].focus();
			} else {
				nextPosition = getNextPosition(row, col, "down");
				if (inputRefs.current[nextPosition]) {
					inputRefs.current[nextPosition].focus();
					setFocusDirection("down");
				}
			}
		} else if (focusDirection === "down") {
			nextPosition = getNextPosition(row, col, "down");
			if (inputRefs.current[nextPosition]) {
				inputRefs.current[nextPosition].focus();
			} else {
				nextPosition = getNextPosition(row, col, "across");
				if (inputRefs.current[nextPosition]) {
					inputRefs.current[nextPosition].focus();
					setFocusDirection("across");
				}
			}
		}
	};

	const getNextPosition = (row, col, direction) => {
		return direction === "across" ? `${row}-${col + 1}` : `${row + 1}-${col}`;
	};

	const checkIfWordIsVertical = (row, col) => {
		return levels[currentLevel].grid[row][col].verticalWord === true;
	};

	const toggleClueModal = (clueUrl, clueColor) => {
		if (showClueModal) {
			setShowClueModal(false);
			setCurrentClueUrl("");
			setModalClueColor("");
		} else {
			setCurrentClueUrl(clueUrl);
			setShowClueModal(true);
			setModalClueColor(clueColor);
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
					onContextMenu={(e) => e.preventDefault()}></td>
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

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: "Alpha Crux: The Word Game",
					text: "Check out this awesome word game!",
					url: "https://mern-ing-the-midnight-oil.github.io/CruxWeb/",
				})
				.then(() => console.log("Successfully shared"))
				.catch((error) => console.log("Error sharing", error));
		} else {
			alert(
				"Sharing is not supported in this browser. Please copy the link manually."
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
					You are Here ^
				</p>
			</div>
			<div className="button-group">
				<button
					className="share-button"
					onClick={handleShare}>
					Share this Game
				</button>
				<a
					href="https://apps.apple.com/us/app/alpha-crux/id6641026804"
					target="_blank"
					rel="noopener noreferrer"
					className="control-button">
					Download for iOS
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
