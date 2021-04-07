import React from "react";
import "./styles/AuctionCardGrid.css";
import CardItem from "./AuctionCardItem";
import { Grid } from "@material-ui/core";

function AuctionCardGrid({ auctions, title }) {
	return (
		<div className="cards">
			<h3>{title}</h3>
			<div className="cards__container">
				<Grid container spacing={4}>
					{auctions.map((auction) => (
						<Grid item xs={12} sm={6} md={3}>
							<CardItem auction={auction} />
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	);
}

export default AuctionCardGrid;
