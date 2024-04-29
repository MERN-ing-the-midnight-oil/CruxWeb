import React, { useState, useRef, useEffect } from "react";
import ColorHash from "color-hash";
import level1 from "./levels/level1";
import level2 from "./levels/level2";

const colorHash = new ColorHash();
const getClueColor = (clueUrl) => {
	return colorHash.hex(clueUrl);
};

const GameBoard = () => {
	const levels = { level1, level2 };
	const [currentLevel, setCurrentLevel] = useState("level1");
	const [guesses, setGuesses] = useState({});
	const [showClueModal, setShowClueModal] = useState(false);
	const [currentClueUrl, setCurrentClueUrl] = useState("");
	const modalRef = useRef(null);
	const inputRefs = useRef({});

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
		const guess = event.target.value.toUpperCase().slice(0, 1);
		setGuesses({ ...guesses, [position]: guess });
	};

	const handleTouchStart = (clueUrl, e) => {
		e.stopPropagation(); // Stop the event from propagating further
		if (e.touches && e.touches.length === 1) {
			setCurrentClueUrl(clueUrl);
			setShowClueModal(true);
		}
	};

	const handleTouchEnd = (e) => {
		e.stopPropagation(); // Stop the event from propagating further
		setShowClueModal(false);
	};

	const renderCell = (cell, rowIndex, colIndex) => {
		const position = `${rowIndex}-${colIndex}`;
		const grid = levels[currentLevel].grid;
		const clueUrl = cell.clue ? levels[currentLevel].clues[cell.clue] : null;
		let cellStyle = {
			borderTop: "1px solid #ccc",
			borderBottom: "1px solid #ccc",
			borderLeft: "1px solid #ccc",
			borderRight: "1px solid #ccc",
		};

		if (cell.clue) {
			const clueColor = getClueColor(clueUrl);
			return (
				<td
					className="clue-cell"
					style={{ backgroundColor: clueColor, ...cellStyle }}
					onTouchStart={(e) => handleTouchStart(clueUrl, e)}
					onTouchEnd={handleTouchEnd}
					onMouseDown={() => setCurrentClueUrl(clueUrl)}
					onMouseUp={() => setShowClueModal(false)}
					onContextMenu={(e) => e.preventDefault()}></td>
			);
		} else if (cell.empty) {
			return (
				<td
					className="empty-cell"
					style={cellStyle}></td>
			);
		} else {
			const correct = guesses[position] === cell.letter;
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
					onMouseUp={() => setShowClueModal(false)}
					onTouchEnd={() => setShowClueModal(false)}>
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
