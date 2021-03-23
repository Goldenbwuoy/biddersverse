import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { Link } from "react-router-dom";
import { getImage } from "../helpers/auction-helper";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		background: theme.palette.background.paper,
		textAlign: "left",
		padding: "0 8px",
	},
	container: {
		minWidth: "100%",
		paddingBottom: "14px",
	},
	gridList: {
		width: "100%",
		minHeight: 200,
		padding: "16px 0 10px",
	},
	title: {
		padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
			2
		)}px`,
		color: theme.palette.openTitle,
		width: "100%",
	},
	tile: {
		textAlign: "center",
	},
	image: {
		height: "100%",
	},
	tileBar: {
		backgroundColor: "rgba(0, 0, 0, 0.72)",
		textAlign: "left",
	},
	tileTitle: {
		fontSize: "1.1em",
		marginBottom: "5px",
		color: "rgb(189, 222, 219)",
		display: "block",
		textDecoration: "none",
	},
	actions: {},
	bottom: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
}));

const calculateTimeLeft = (date) => {
	const difference = date - new Date();
	let timeLeft = {};

	if (difference > 0) {
		timeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
			timeEnd: false,
		};
	} else {
		timeLeft = { timeEnd: true };
	}

	return timeLeft;
};

function AuctionsGrid(props) {
	const classes = useStyles();
	const currentDate = new Date();

	const showTimeLeft = (date) => {
		let timeLeft = calculateTimeLeft(date);
		return (
			!timeLeft.timeEnd && (
				<span>
					{timeLeft.days !== 0 && `${timeLeft.days} d `}
					{timeLeft.hours !== 0 && `${timeLeft.hours} h `}
					{timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
					{timeLeft.seconds !== 0 && `${timeLeft.seconds} s `} left
				</span>
			)
		);
	};

	// const getImage = (image) => {
	// 	const img = `http://localhost:5000/${image}`;
	// 	return img;
	// };
	const auctionState = (auction) => {
		return (
			<span>
				{currentDate < new Date(auction.bidStart) &&
					`Auction Starts at ${new Date(
						auction.bidStart
					).toLocaleString()}`}
				{currentDate > new Date(auction.bidStart) &&
					currentDate < new Date(auction.bidEnd) && (
						<>
							{`Auction is live | ${auction.bids.length} bids |`}{" "}
							<br />
							{showTimeLeft(new Date(auction.bidEnd))}
						</>
					)}
				{currentDate > new Date(auction.bidEnd) &&
					`Auction Ended | ${auction.bids.length} bids `}
				{currentDate > new Date(auction.bidStart) &&
					auction.bids.length > 0 &&
					` | Last bid: $ ${auction.bids[0].bid}`}
			</span>
		);
	};
	return (
		<div className={classes.root}>
			{props.products.length > 0 ? (
				<div className={classes.container}>
					<GridList
						cellHeight={200}
						className={classes.gridList}
						cols={3}
					>
						{props.products.map((auction, i) => (
							<GridListTile key={i} className={classes.tile}>
								<Link to={"/auction/" + auction._id}>
									<img
										className={classes.image}
										src={getImage(auction?.images[0])}
										alt={auction.itemName}
									/>
								</Link>
								<GridListTileBar
									className={classes.tileBar}
									title={
										<Link
											to={"/auction/" + auction._id}
											className={classes.tileTitle}
										>
											{auction.itemName}
										</Link>
									}
									subtitle={
										<>
											<div className={classes.bottom}>
												<span>
													{auctionState(auction)}
												</span>
											</div>
										</>
									}
								/>
							</GridListTile>
						))}
					</GridList>
				</div>
			) : (
				props.searched && (
					<Typography
						variant="subheading"
						component="h4"
						className={classes.title}
					>
						No products found! :(
					</Typography>
				)
			)}
		</div>
	);
}

export default AuctionsGrid;
