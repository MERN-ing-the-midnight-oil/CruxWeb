import React, { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./GameBoard";

// Introduction modal component
const IntroductionModal = ({ onDismiss }) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleDismiss = () => {
		setIsVisible(false);
		onDismiss();
	};

	useEffect(() => {
		setIsVisible(true);
	}, []);

	if (!isVisible) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2 style={{ textAlign: "center", fontWeight: "bold" }}>
					Welcome to Crux!
				</h2>
				<p>
					Tap on the colorful cells to see clues for the adjacent words. Each
					clue is related to all adjacent words. Guess the words by typing
					letters into the white squares. Correct letters will turn green. Good
					luck!
				</p>
				<div style={{ textAlign: "center" }}>
					<button onClick={handleDismiss}>Got It!</button>
				</div>
			</div>
		</div>
	);
};

function App() {
	const [showModal, setShowModal] = useState(true);

	const handleModalDismiss = () => {
		setShowModal(false);
	};

	return (
		<div className="app-container">
			<h1 className="app-title">Crux</h1>
			{showModal && <IntroductionModal onDismiss={handleModalDismiss} />}

			<GameBoard />
		</div>
	);
}

export default App;
