import React, { useEffect, useState } from "react";
import "./styles/AuctionCardGrid.css";
import CardItem from "./AuctionCardItem";
import { Container, Divider, Grid, makeStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		width: 200,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const sortValues = { recent: "recent", name: "name", popularity: "popularity" };

function AuctionCardGrid({ auctions, setAuctions, title }) {
	const classes = useStyles();
	const [selected, setSelected] = useState("");

	// useEffect(() => {
	// 	setSelected(sortValues.recent);
	// 	const sortedByCreated = auctions.sort((current, next) => {
	// 		const keyA = new Date(current.createdAt);
	// 		const keyB = new Date(next.createdAt);

	// 		if (keyA > keyB) return -1;
	// 		if (keyB < keyA) return 1;
	// 		return 0;
	// 	});
	// 	setAuctions(sortedByCreated);
	// }, [title, auctions]);

	const sortListings = (criteria) => {
		if (criteria === sortValues.recent) {
			const sortedByCreated = auctions.sort((current, next) => {
				const keyA = new Date(current.createdAt);
				const keyB = new Date(next.createdAt);

				if (keyA > keyB) return -1;
				if (keyB < keyA) return 1;
				return 0;
			});
			setAuctions(sortedByCreated);
		} else if (criteria === sortValues.name) {
			const sortedByName = auctions.sort((current, next) => {
				if (
					current.itemName.toLowerCase() < next.itemName.toLowerCase()
				)
					return -1;
				if (
					current.itemName.toLowerCase() > next.itemName.toLowerCase()
				)
					return 1;
				return 0;
			});
			setAuctions(sortedByName);
		} else if (criteria === sortValues.popularity) {
			const sortedByBids = auctions.sort((current, next) => {
				if (current.bids.length > next.bids.length) return -1;
				if (current.bids.length < next.bids.length) return 1;
				return 0;
			});
			setAuctions(sortedByBids);
		} else {
			setAuctions(auctions);
		}
	};

	const handleChange = (event) => {
		setSelected(event.target.value);
		sortListings(event.target.value);
	};

	console.log(selected);
	return (
		<Container component="main" maxWidth="xl">
			<div className="cards">
				<div className="cards__container">
					<h3 className="cards__header">
						{title} {`(${auctions?.length} listings)`}
					</h3>
					{auctions?.length !== 0 && (
						<div className="sort_input">
							<FormControl
								variant="filled"
								size="small"
								margin="none"
								className={classes.formControl}
							>
								<InputLabel htmlFor="outlined-age-native-simple">
									Sort By
								</InputLabel>
								<Select
									native
									value={selected}
									onChange={handleChange}
									label="Sort By"
								>
									<option value={sortValues.recent}>
										Recently Listed
									</option>
									<option value={sortValues.name}>
										Name
									</option>
									<option value={sortValues.popularity}>
										Popularity
									</option>
								</Select>
							</FormControl>
						</div>
					)}

					<Divider style={{ marginBottom: 15 }} />
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
