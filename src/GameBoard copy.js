import React from "react";
import level1 from "./levels/level1"; // Adjust the path as necessary

const GameBoard = () => {
	let maxX = 0;
	let maxY = 0;

	// First, find the maximum extents of the grid needed by the words
	level1.words.forEach(({ word, start, direction }) => {
		if (direction === "across") {
			maxX = Math.max(maxX, start.x + word.length); // Rightward extension
			maxY = Math.max(maxY, start.y + 1); // Downward extension for words going across
		} else {
			// 'down'
			maxX = Math.max(maxX, start.x + 1); // Rightward extension for words going down
			maxY = Math.max(maxY, start.y + word.length); // Downward extension
		}
	});

	// Adjust maxX and maxY to add padding on the right and bottom
	maxX += 2; // Add 2 to include initial left padding and right padding
	maxY += 2; // Add 2 to include initial top padding and bottom padding

	// Initialize the grid with padding accounted for
	let grid = Array.from({ length: maxY }, () =>
		Array.from({ length: maxX }, () => "")
	);

	// Place words on the grid, adjusting for the initial top and left padding
	level1.words.forEach(({ word, start, direction }) => {
		let [x, y] = [start.x + 1, start.y + 1]; // Start positions adjusted for initial padding
		word.split("").forEach((letter) => {
			grid[y][x] = letter;
			if (direction === "across") {
				x += 1;
			} else {
				y += 1;
			}
		});
	});

	return (
		<div className="game-board">
			{grid.map((row, rowIndex) => (
				<div
					key={rowIndex}
					className="grid-row">
					{row.map((cell, cellIndex) => (
						<div
							key={cellIndex}
							className={`grid-cell ${cell ? "" : "empty-cell"}`}>
							{cell || " "} {/* Render space for layout if cell is empty */}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default GameBoard;
