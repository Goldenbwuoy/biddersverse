import React from "react";
import "./styles/AuctionCardGrid.css";
import CardItem from "./AuctionCardItem";
import { Container, Grid } from "@material-ui/core";

function AuctionCardGrid({ auctions, title }) {
	return (
		<Container component="main" maxWidth="xl">
			<div className="cards">
				<div className="cards__container">
					<h3 className="cards__header">{title}</h3>
					{auctions?.length ? (
						<Grid container spacing={4}>
							{auctions.map((auction) => (
								<Grid
									key={auction._id}
									item
									xs={12}
									sm={6}
									md={3}
								>
									<CardItem auction={auction} />
								</Grid>
							))}
						</Grid>
					) : (
						<div>
							<h4>No Listings Found!!</h4>
						</div>
					)}
				</div>
			</div>
		</Container>
	);
}

export default AuctionCardGrid;
