// Clue.js
import React from "react";

const Clue = ({ imageSrc, onClick }) => {
	return (
		<img
			src={imageSrc}
			alt="Clue"
			onClick={onClick}
		/>
	);
};
