import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import auth from "../auth/auth-helper";
import { makeStyles } from "@material-ui/core/styles";
import SocketIOClient from "socket.io-client";
import BidHistory from "./BidHistory";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getDepositAmount } from "../helpers/auction-helper";
import PayDeposit from "../checkout/PayDeposit";
const endpoint = "http://127.0.0.1:5000";

let socket;

const useStyles = makeStyles((theme) => ({
	placeForm: {
		margin: "0px 16px 16px",
		// backgroundColor: "#e7ede4",
		display: "inline-block",
		borderRadius: 3,
		boxShadow: `0 6px 20px rgba(0, 102, 55, 0.3)`,
		border: `1px rgba(0, 102, 55, 0.3) solid`,
	},
	marginInput: {
		margin: 16,
	},
	marginBtn: {
		margin: "8px 16px 16px",
	},

	message: {
		padding: "5px",
	},
}));

const isRegisteredBidder = (bidders, bidder) => {
	let isRegistered = false;
	bidders.find((item, index) => {
		if (item._id === bidder) {
			isRegistered = true;
			return isRegistered;
		}
	});

	return isRegistered;
};

function Bidding(props) {
	const classes = useStyles();
	const [bid, setBid] = useState("");
	const { user } = auth.isAuthenticated();
	const isSeller = user?._id === props.auction.seller._id;

	useEffect(() => {
		socket = SocketIOClient(endpoint);
		socket.emit("join auction room", { room: props.auction._id });
		return () => {
			socket.emit("leave auction room", {
				room: props.auction._id,
			});
		};
	}, [props.auction._id]);

	console.log(props.auction);
	console.log(user?._id);
	console.log(isRegisteredBidder(props.auction.bidders, user._id));

	useEffect(() => {
		socket.on("new bid", (payload) => {
			props.updateBids(payload);
		});

		return () => {
			socket.off("new bid");
		};
	});

	const handleChange = (event) => {
		setBid(event.target.value);
	};

	const placeBid = () => {
		let newBid = {
			bid: bid,
			time: new Date(),
			bidder: user,
		};
		socket.emit("new bid", {
			room: props.auction._id,
			bidInfo: newBid,
		});
		console.log(newBid);
		setBid("");
	};

	const minBid =
		props.auction.bids && props.auction.bids.length > 0
			? props.auction.bids[0].bid
			: props.auction.startingBid;

	return (
		<div>
			{!props.justEnded &&
				new Date() < new Date(props.auction.bidEnd) &&
				!isSeller && (
					<>
						{isRegisteredBidder(props.auction.bidders, user._id) ? (
							<div className={classes.placeForm}>
								{props.auction.bids.length &&
								props.auction.bids[0].bidder?._id ===
									user._id ? (
									<Typography className={classes.message}>
										You are currently the highest bidder in
										this Auction.
									</Typography>
								) : (
									<>
										<TextField
											id="bid"
											label="Your Bid ($)"
											value={bid}
											onChange={handleChange}
											type="number"
											margin="normal"
											helperText={`Enter $${
												Number(minBid) + 1
											} or more`}
											className={classes.marginInput}
										/>
										<br />
										<Button
											variant="contained"
											className={classes.marginBtn}
											color="secondary"
											disabled={bid < minBid + 1}
											onClick={placeBid}
										>
											Place Bid
										</Button>
										<br />
									</>
								)}
							</div>
						) : (
							<>
								<div className={classes.placeForm}>
									<Typography className={classes.message}>
										{`Bidders must pay a deposit of 10% of the
									starting price of an auction in order to
									participate in the auction. Pay $${getDepositAmount(props.auction)} to Join
									the auction.`}
									</Typography>
								</div>
								<PayDeposit
									updateAuction={props.updateBids}
									auction={props.auction}
								/>
							</>
						)}
					</>
				)}

			{/* At the end of the auction, if there are any bids placed, the seller should be able to see the winning bidder and the bid history */}
			{props.justEnded &&
				new Date() > new Date(props.auction.bidEnd) &&
				isSeller && (
					<div className={classes.placeForm}>
						{props.auction.bids.length > 0 ? (
							<>
								<Typography className={classes.message}>
									Item Sold to{" "}
									{props.auction.bids[0].bidder.firstName}
								</Typography>
							</>
						) : (
							<Typography className={classes.message}>
								The Auction has ended and no bids have been
								placed, you can extend the Bid end time to bring
								it back Live
							</Typography>
						)}
					</div>
				)}

			{/* At the end of the auction, if there are any bids placed, the winning bidder should see a congratulations messages and button to checkout and pay */}

			{props.justEnded &&
				new Date() > new Date(props.auction.bidEnd) &&
				!isSeller && (
					<div className={classes.placeForm}>
						{props.auction.bids.length > 0 ? (
							<div>
								{user._id ===
									props.auction.bids[0].bidder._id && (
									<>
										{props.auction.purchased ? (
											<Typography
												className={classes.message}
											>
												You have paid for the auction
												won, to check track your orders{" "}
												<Link to="/buyer/orders">
													Click here
												</Link>
												. Thank you for bidding with
												Biddersverse 🚀
											</Typography>
										) : (
											<Typography
												className={classes.message}
											>
												Congratulations!!!! You have won
												this Auction. Winners are
												required to pay for the won
												items within 72 hours. Enter
												your checkout details to place
												your order. Thank you for
												bidding with Biddersverse 🚀
											</Typography>
										)}
									</>
								)}
							</div>
						) : (
							<Typography>
								The Auction has ended and No bids have been
								placed!!!
							</Typography>
						)}
					</div>
				)}
			{props.auction.bids.length > 0 && (
				<BidHistory bids={props.auction.bids} />
			)}
		</div>
	);
}

export default Bidding;
