import React from "react";
import "./App.css";
import GameBoard from "./GameBoard";

function App() {
	return (
		<div className="app-container">
			<h1 className="app-title">Crux</h1>
			<p className="app-instructions">
				Welcome to Crux! The crossword game with a dash of{" "}
				<a
					href="https://boardgamegeek.com/boardgame/39856/dixit"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "blue" }}>
					Dixit
				</a>{" "}
				and a sprinkle of{" "}
				<a
					href="https://boardgamegeek.com/boardgame/181304/mysterium"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "blue" }}>
					Mysterium
				</a>
				. Click on the colored areas to see picture clues that somehow pertain
				to all adjacent words. Type your solutions into the white squares.
				Correct letters will turn the grid square from white to green. Good
				luck!
			</p>
			<GameBoard />
			<p className="attribution">
				Designed and developed by{" "}
				<a
					href="https://www.linkedin.com/in/rhys-smoker/"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "blue" }}>
					Rhys Smoker
				</a>
			</p>
			<p>
				Show the{" "}
				<a
					href={`${process.env.PUBLIC_URL}/images/QR_Code.png`}
					target="_blank">
					QR code link
				</a>{" "}
				to this page
			</p>
		</div>
	);
}

export default App;
