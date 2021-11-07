import React from "react";
import "./styles/HeroSection.css";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Icon } from "@material-ui/core";
import Search from "./Search";

function HeroSection() {
	return (
		<div className="hero-container">
			<video src="/videos/video-2.mp4" autoPlay loop />
			<div className="hero-section-div">
				<p>Leader in Electronics Auctions</p>
				<Search />
				{/* <form
					action=""
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<span className="search-section">
						<input
							className="search-input"
							type="text"
							placeholder="Search Auctions..."
						/>
						<Button className="search-icon">
							<SearchIcon />
						</Button>
					</span>
				</form> */}
			</div>
		</div>
	);
}

export default HeroSection;
