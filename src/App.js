import React from "react";
import "./App.css"; // Assuming your styles are here
import GameBoard from "./GameBoard"; // Adjust the import path if necessary

function App() {
	return (
		<div className="app-container">
			<h1 className="app-title">Crux</h1>
			<p className="app-instructions">
				Welcome to Crux! The crossword game with a dash of Dixit and a sprinkle
				of Mysterium. Click on the colored areas to see picture clues that
				somehow pertain to all adjacent words. Type your solutions into the
				white squares. Correct letters will turn the grid square from white to
				green. Good luck!
			</p>
			<GameBoard />
		</div>
	);
}

export default App;
