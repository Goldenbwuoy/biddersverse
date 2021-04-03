import React from "react";
import { Link } from "react-router-dom";
import "./styles/Button.css";

function Button({ text }) {
	return (
		<Link to="/">
			<button className="btn">{text}</button>
		</Link>
	);
}

export default Button;
