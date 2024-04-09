import React from "react";
import "./App.css"; // Assuming your styles are here
import GameBoard from "./GameBoard"; // Adjust the import path if necessary

function App() {
	return (
		<div className="app-container">
			<h1 className="app-title">Crux</h1>
			<p className="app-instructions">
				Welcome to Crux! The crossword game with an dash of CodeNames. Click on
				the magnifying glass icons on word intersections to see picture clues
				that somehow pertain to both words. Type your solutions into the
				squares. Good luck!
			</p>
			<GameBoard />
		</div>
	);
}

export default App;
