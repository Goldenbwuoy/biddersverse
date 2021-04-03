import React from "react";
import "./styles/HeroSection.css";

function HeroSection() {
	return (
		<div className="hero-container">
			<video src="/videos/video-2.mp4" autoPlay loop />
			<div className="hero-section-div">
				<p>Leader in Electronics Auctions</p>
				<input type="text" placeholder="Search Auctions..." />
			</div>
		</div>
	);
}

export default HeroSection;
