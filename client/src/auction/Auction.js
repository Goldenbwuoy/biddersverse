import React, { useEffect, useState } from "react";
import { Card, CardHeader, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listRelated, read } from "./api-auction.js";
import { Link, Redirect } from "react-router-dom";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import auth from "../auth/auth-helper.js";
import Timer from "./Timer.js";
import Bidding from "./Bidding.js";
import AuctionSettingsMenu from "./AuctionSettingsMenu";
import Suggestions from "./Suggestions.js";
import Chat from "./chat/Chat.js";
import Checkout from "../checkout/Checkout";
import Loading from "../core/Loading";
import AuctionImageSlider from "./AuctionImageSlider.js";
import AuctionDetailTabs from "./AuctionDetailTabs.js";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(10),
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
		fontWeight: "700",
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
	const [openChats, setOpenChats] = useState(false);

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

	const toggleChats = () => {
		setOpenChats(!openChats);
	};

	if (redirectToMyAuctions) {
		return <Redirect to="/auctions/all/by-seller" />;
	}

	if (redirectToOrder) {
		return <Redirect to={`/order/${orderId}`} />;
	}

	const currentDate = new Date();
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={9} lg={9}>
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

								{/* <Typography
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
								</Typography> */}
							</Grid>

							<Grid item lg={7} md={6} xs={12} sm={12}>
								{currentDate > new Date(auction.bidStart) ? (
									<>
										<Timer
											endTime={auction.bidEnd}
											update={update}
										/>
										{auction.bids.length > 0 ? (
											<Typography
												component="p"
												variant="subtitle1"
												className={classes.lastBid}
											>
												{` Current Highest Bid: $ ${auction.bids[0].bid}`}
											</Typography>
										) : (
											<Typography
												component="p"
												variant="subtitle1"
												className={classes.lastBid}
											>
												{` Starting Bid: $ ${auction.startingBid}`}
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
																			color: "red",
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
							<AuctionDetailTabs auction={auction} />
						</Grid>
					</Card>
					{/* Chat component */}
					{
						auth.isAuthenticated() && (
							// <Button
							// 	className={classes.toggleChatsButton}
							// 	color="primary"
							// 	variant="contained"
							// 	onClick={toggleChats}
							// >
							// 	Chat Messages ({auction.messages?.length}){" "}
							// 	{openChats ? (
							// 		<ExpandLess className={classes.rightIcon} />
							// 	) : (
							// 		<ExpandMore className={classes.rightIcon} />
							// 	)}
							// </Button>
							<Chat
								auction={auction}
								openChats={openChats}
								setOpenChats={setOpenChats}
							/>
						)

						// <Chat auction={auction} />
					}
				</Grid>
				<Grid item xs={12} md={3} lg={3}>
					{/* Related products */}
					<Suggestions
						auctions={relatedAuctions}
						title="Related Auctions"
					/>
				</Grid>
			</Grid>
			{/* <Chat
				auction={auction}
				openChats={openChats}
				setOpenChats={setOpenChats}
			/> */}
		</div>
	);
}

export default Auction;
