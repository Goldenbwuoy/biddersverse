import {
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { getImage } from "../helpers/auction-helper";
import { read } from "./api-order";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({
	card: {
		textAlign: "start",
		paddingLeft: theme.spacing(1),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
		flexGrow: 1,
		margin: 30,
	},
	cart: {
		textAlign: "left",
		width: "100%",
		display: "inline-flex",
	},
	details: {
		display: "inline-block",
		width: "100%",
		padding: "4px",
	},
	content: {
		flex: "1 0 auto",
		padding: "16px 8px 0px",
	},
	cover: {
		width: 160,
		height: 125,
		margin: "8px",
	},
	info: {
		color: "rgba(83, 170, 146, 0.82)",
		fontSize: "0.95rem",
		display: "inline",
	},
	thanks: {
		color: "rgb(136, 183, 107)",
		fontSize: "0.9rem",
		fontStyle: "italic",
	},
	innerCardItems: {
		textAlign: "left",
		margin: "24px 10px 24px 24px",
		padding: "24px 20px 40px 20px",
		backgroundColor: "#80808017",
	},
	innerCard: {
		textAlign: "left",
		margin: "24px 24px 24px 10px",
		padding: "30px 45px 40px 45px",
		backgroundColor: "#80808017",
	},
	title: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
		color: theme.palette.openTitle,
		fontSize: "1.2em",
	},
	subheading: {
		marginTop: theme.spacing(1),
		color: theme.palette.openTitle,
		marginLeft: 10,
	},
	productTitle: {
		fontSize: "1.15em",
		marginBottom: "5px",
	},
	itemTotal: {
		float: "right",
		marginRight: "40px",
		fontSize: "1.5em",
		color: "rgb(72, 175, 148)",
	},
	itemShop: {
		display: "block",
		fontSize: "1em",
		color: "#78948f",
	},
	checkout: {
		margin: "24px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	review: {
		color: "rgb(53, 97, 85)",
	},
	total: {
		fontSize: "1.2em",
		color: "rgb(53, 97, 85)",
		marginRight: "16px",
		fontWeight: "600",
		verticalAlign: "bottom",
	},
}));

function Order({ match }) {
	const classes = useStyles();
	const { token } = auth.isAuthenticated();
	const [order, setOrder] = useState([]);
	const [loading, setLoading] = useState(true);
	const [reviewed, setReviewed] = useState(false);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		read(
			{
				orderId: match.params.orderId,
			},
			{ token: token },
			signal
		).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setOrder(data);
				setReviewed(data.reviewed);
				setLoading(false);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.orderId, token]);

	const getWinningBid = () => {
		return order?.auction.bids[0].bid;
	};

	return (
		<div style={{ height: "100vh" }}>
			<Card className={classes.card}>
				<h3 className="cards__header">Order Details</h3>
				{!loading && (
					<>
						<Typography
							type="subheading"
							component="h2"
							className={classes.subheading}
						>
							Order Code: <strong>{order._id}</strong> <br />{" "}
							Placed on {new Date(order.createdAt).toDateString()}
						</Typography>
						<br />
						<Grid container spacing={4}>
							<Grid item xs={7} sm={7}>
								<Card className={classes.innerCardItems}>
									<span>
										<Card className={classes.cart}>
											{order.auction.images?.length && (
												<CardMedia
													className={classes.cover}
													image={getImage(
														order.auction.images[0]
													)}
													title={
														order.auction.itemName
													}
												/>
											)}

											<div className={classes.details}>
												<CardContent
													className={classes.content}
												>
													<Typography
														type="title"
														component="h3"
														className={
															classes.productTitle
														}
														color="primary"
													>
														<strong>
															{
																order.auction
																	.itemName
															}
														</strong>
													</Typography>

													<Typography
														type="subheading"
														component="h3"
														color={
															order.status ===
															"Cancelled"
																? "error"
																: "primary"
														}
													>
														Status: {order.status}
													</Typography>
												</CardContent>
											</div>
										</Card>
										<Divider />
									</span>
									<div className={classes.checkout}>
										<span>
											{order.status === "Delivered" &&
												!reviewed && (
													<Review
														order={order}
														setReviewed={
															setReviewed
														}
													/>
												)}
										</span>
										<span className={classes.total}>
											Winning Bid: ${getWinningBid()}
										</span>
									</div>
								</Card>
							</Grid>
							<Grid item xs={5} sm={5}>
								<Card className={classes.innerCard}>
									<Typography
										type="subheading"
										component="h2"
										className={classes.productTitle}
										color="primary"
									>
										Deliver to:
									</Typography>
									<Typography
										type="subheading"
										component="h3"
										className={classes.info}
										color="primary"
									>
										<strong>{`${order.buyer.firstName} ${order.buyer.lastName}`}</strong>
									</Typography>
									<br />
									<Typography
										type="subheading"
										component="h3"
										className={classes.info}
										color="primary"
									>
										{order.email}
									</Typography>
									<br />
									<br />
									<Divider />
									<br />
									<Typography
										type="subheading"
										component="h3"
										className={classes.itemShop}
										color="primary"
									>
										{order.shipping_address.street}
									</Typography>
									<Typography
										type="subheading"
										component="h3"
										className={classes.itemShop}
										color="primary"
									>
										{order.shipping_address.city},{" "}
										{order.shipping_address.province}{" "}
										{order.shipping_address.zipcode}
									</Typography>
									<Typography
										type="subheading"
										component="h3"
										className={classes.itemShop}
										color="primary"
									>
										{order.shipping_address.country}
									</Typography>
									<br />
									<Typography
										type="subheading"
										component="h3"
										className={classes.thanks}
										color="primary"
									>
										Thank you for shopping with us! <br />
										You can track the status of your
										purchased items on this page.
									</Typography>
								</Card>
							</Grid>
						</Grid>
					</>
				)}
			</Card>
		</div>
	);
}

export default Order;
