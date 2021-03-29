import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { listRelated, read } from "./api-auction.js";
import { Link, Redirect } from "react-router-dom";
import auth from "../auth/auth-helper.js";
import Timer from "./Timer.js";
import Bidding from "./Bidding.js";
import AuctionSettingsMenu from "./AuctionSettingsMenu";
import Suggestions from "./Suggestions.js";
import Chat from "./chat/Chat.js";
import Checkout from "../checkout/Checkout";
import Loading from "../core/Loading";
import AuctionImageSlider from "./AuctionImageSlider.js";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 30,
	},
	flex: {
		display: "flex",
	},
	card: {
		padding: "24px 40px 40px",
	},
	subheading: {
		margin: "16px",
		color: theme.palette.openTitle,
	},
	description: {
		margin: "16px",
		fontSize: "0.9em",
		color: "#4f4f4f",
	},
	price: {
		padding: "16px",
		margin: "16px 0px",
		display: "flex",
		backgroundColor: "#93c5ae3d",
		fontSize: "1.3em",
		color: "#375a53",
	},
	media: {
		height: 300,
		// display: "inline-block",
		width: "100%",
		objectFit: "cover",
	},
	icon: {
		verticalAlign: "sub",
	},
	link: {
		color: "#3e4c54b3",
		fontSize: "0.9em",
	},
	itemInfo: {
		width: "35%",
		margin: "16px",
	},
	bidSection: {
		margin: "20px",
		minWidth: "50%",
	},
	lastBid: {
		color: "#303030",
		margin: "16px",
	},
	rightIcon: {
		marginLeft: "12px",
	},
	toggleChatsButton: {
		marginTop: "25px",
	},
	paymentError: {
		margin: theme.spacing(2),
	},
}));

function Auction({ match }) {
	const classes = useStyles();
	const [auction, setAuction] = useState({});
	const [error, setError] = useState("");
	const [relatedAuctions, setRelatedAuctions] = useState([]);
	const [justEnded, setJustEnded] = useState(false);
	const [redirectToMyAuctions, setRedirectToMyAuctions] = useState(false);
	const [redirectToOrder, setRedirectToOrder] = useState(false);
	const [loading, setLoading] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [paymentError, setPaymentError] = useState("");

	console.log(auction);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		read({ auctionId: match.params.auctionId }, signal).then((data) => {
			if (data && data.error) {
				setError(data.error);
			} else {
				setAuction(data);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.auctionId]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		listRelated({ auctionId: match.params.auctionId }, signal).then(
			(data) => {
				if (data && data.error) {
					console.log(data.error);
				} else {
					setRelatedAuctions(data);
				}
			}
		);

		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.auctionId]);

	const updateBids = (updatedAuction) => {
		setAuction(updatedAuction);
	};

	const update = () => {
		setJustEnded(true);
	};

	if (redirectToMyAuctions) {
		return <Redirect to="/auctions/all/by-seller" />;
	}

	if (redirectToOrder) {
		return <Redirect to={`/order/${orderId}`} />;
	}

	if (loading) {
		return <Loading />;
	}

	const currentDate = new Date();
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} lg={8}>
					<Card className={classes.card}>
						<CardHeader
							title={auction.itemName}
							subheader={
								<>
									<span>
										{currentDate <
											new Date(auction.bidStart) &&
											"Auction Not Started"}
										{currentDate >
											new Date(auction.bidStart) &&
											currentDate <
												new Date(auction.bidEnd) &&
											"Auction Live"}
										{currentDate >
											new Date(auction.bidEnd) &&
											"Auction Ended"}
									</span>
									{auth.isAuthenticated().user &&
										auth.isAuthenticated().user._id ===
											auction.seller?._id && (
											<span style={{ float: "right" }}>
												<AuctionSettingsMenu
													auction={auction}
													SetRedirect={
														setRedirectToMyAuctions
													}
												/>
											</span>
										)}
								</>
							}
						/>
						<Grid container spacing={6}>
							<Grid item lg={5} md={6} xs={12} sm={12}>
								{/* Image slider */}
								<AuctionImageSlider auction={auction} />

								<Typography
									component="p"
									variant="subtitle1"
									className={classes.subheading}
								>
									About Item
								</Typography>
								<Typography
									component="p"
									className={classes.description}
								>
									{auction.description}
								</Typography>
							</Grid>

							<Grid item lg={7} md={6} xs={12} sm={12}>
								{currentDate > new Date(auction.bidStart) ? (
									<>
										<Timer
											endTime={auction.bidEnd}
											update={update}
										/>
										{auction.bids.length > 0 && (
											<Typography
												component="p"
												variant="subtitle1"
												className={classes.lastBid}
											>
												{` Current highest bid: $ ${auction.bids[0].bid}`}
											</Typography>
										)}
										{!auth.isAuthenticated() && (
											<Typography
												style={{ padding: "16px" }}
											>
												Please,{" "}
												<Link to="/signin">
													sign in
												</Link>{" "}
												to place your bid.
											</Typography>
										)}
										{auth.isAuthenticated() && (
											<>
												<Bidding
													auction={auction}
													justEnded={justEnded}
													updateBids={updateBids}
												/>
												{justEnded &&
													!auction.purchased &&
													auth.isAuthenticated().user
														._id ===
														auction.bids[0]?.bidder
															._id && (
														<>
															<Checkout
																auction={
																	auction
																}
																setLoading={
																	setLoading
																}
																setRedirectToOrder={
																	setRedirectToOrder
																}
																setOrderId={
																	setOrderId
																}
																setPaymentError={
																	setPaymentError
																}
															/>
															{paymentError && (
																<div
																	className={
																		classes.paymentError
																	}
																>
																	<Typography
																		style={{
																			color:
																				"red",
																		}}
																	>
																		{
																			paymentError
																		}
																	</Typography>
																</div>
															)}
														</>
													)}
											</>
										)}
									</>
								) : (
									<Typography
										component="p"
										variant="h6"
									>{`Auction Starts at ${new Date(
										auction.bidStart
									).toLocaleString()}`}</Typography>
								)}
							</Grid>
						</Grid>
					</Card>
					{/* Chat component */}
					{auth.isAuthenticated() && <Chat auction={auction} />}
				</Grid>
				<Grid item xs={12} md={4} lg={4}>
					{/* Related products */}
					<Suggestions
						auctions={relatedAuctions}
						title="Related Auctions"
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default Auction;
