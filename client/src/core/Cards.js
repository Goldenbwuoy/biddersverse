import React from "react";
import CardItem from "./CardItem";
import "./styles/Cards.css";
import { Grid } from "@material-ui/core";

function Cards() {
	return (
		<div className="cards">
			<h3>Checkout These Recently Added Auctions</h3>
			<div className="cards__container">
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6} md={3}>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Cards;
