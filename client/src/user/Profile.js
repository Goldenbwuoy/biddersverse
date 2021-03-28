import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import auth from "./../auth/auth-helper";
import { getProfile } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import profileImage from "../assets/images/profile-pic.jpg";
import stripeButton from "../assets/images/stripeButton.png";
import { Button, Card, Grid, Tooltip } from "@material-ui/core";
import Reviews from "./Reviews";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
		marginTop: theme.spacing(5),
	},
	paper: theme.mixins.gutters({
		maxWidth: 700,
		margin: "auto",
		padding: theme.spacing(3),
		backgroundColor: "#80808024",
	}),
	topSection: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
		color: theme.palette.openTitle,
	},
	card: {
		padding: "8px",
	},
	stripe_connect: {
		marginRight: "10px",
	},
	stripe_connected: {
		verticalAlign: "super",
		marginRight: "10px",
	},
	infoContainer: {
		display: "flex",
		justifyContent: "space-between",
		margin: "20px 0",
	},
	infoText: {
		display: "flex",
		marginBottom: "15px",
	},
	profileImage: {
		display: "flex",
		width: "200px",
	},
	infoTitle: {
		fontWeight: "700",
		marginRight: "10px",
	},
	auctionsInfo: {
		display: "flex",
		justifyContent: "space-around",
		margin: "20px 0",
	},
	auctionInfoSection: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	stripeInfo: {
		display: "flex",
		justifyContent: "space-around",
		margin: "20px 0",
	},
	statsNumber: {
		fontSize: 24,
		fontWeight: "800",
	},
}));

function Profile({ match }) {
	const classes = useStyles();
	const [user, setUser] = useState({});
	const [stats, setStats] = useState({});
	const [redirectToSignin, setRedirectToSignin] = useState(false);
	const { token } = auth.isAuthenticated();
	const isUser =
		auth.isAuthenticated().user &&
		auth.isAuthenticated().user._id === user?._id;

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		getProfile(
			{
				userId: match.params.userId,
			},
			{ token: token },
			signal
		).then((data) => {
			if (data && data.error) {
				setRedirectToSignin(true);
			} else {
				setUser(data.profile);
				setStats(data.stats);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.userId, token]);

	if (redirectToSignin) {
		return <Redirect to="/signin" />;
	}
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} lg={6}>
					<Paper className={classes.paper} elevation={4}>
						<span className={classes.topSection}>
							<Typography variant="h6" className={classes.title}>
								Profile
							</Typography>
							{isUser && (
								<Tooltip title="Edit Profile">
									<Link to={`/user/edit/${user._id}`}>
										<EditIcon color="primary" />
									</Link>
								</Tooltip>
							)}
						</span>

						<Card className={classes.card}>
							<div className={classes.infoContainer}>
								<div>
									<span className={classes.infoText}>
										<Typography
											className={classes.infoTitle}
										>
											First Name:
										</Typography>
										<Typography>
											{user.firstName}
										</Typography>
									</span>
									<span className={classes.infoText}>
										<Typography
											className={classes.infoTitle}
										>
											Last Name:
										</Typography>
										<Typography>{user.lastName}</Typography>
									</span>
									<span className={classes.infoText}>
										<Typography
											className={classes.infoTitle}
										>
											Phone Number:
										</Typography>
										<Typography>
											{user.phoneNumber}
										</Typography>
									</span>
									<span className={classes.infoText}>
										<Typography
											className={classes.infoTitle}
										>
											Member Since:
										</Typography>
										<Typography>
											{new Date(
												user.createdAt
											).toDateString()}
										</Typography>
									</span>
								</div>
								<img
									className={classes.profileImage}
									src={profileImage}
									alt="profile"
								/>
							</div>
							<Divider />
							<div className={classes.auctionsInfo}>
								{user.seller && (
									<>
										<div
											className={
												classes.auctionInfoSection
											}
										>
											<Typography
												className={classes.statsNumber}
											>
												{stats.auctionsPosted}
											</Typography>
											<Typography>
												Auctions Posted
											</Typography>
										</div>
										<div
											className={
												classes.auctionInfoSection
											}
										>
											<Typography
												className={classes.statsNumber}
											>
												{stats.soldAuctions}
											</Typography>
											<Typography>
												Sold Auctions
											</Typography>
										</div>
									</>
								)}

								<div className={classes.auctionInfoSection}>
									<Typography className={classes.statsNumber}>
										{stats.bidsByUser}
									</Typography>
									<Typography>Auctions Bid On</Typography>
								</div>
								<div className={classes.auctionInfoSection}>
									<Typography className={classes.statsNumber}>
										{stats.wonByUser}
									</Typography>
									<Typography>Auctions Won</Typography>
								</div>
							</div>
							<Divider />
							<div className={classes.stripeInfo}>
								<span>
									{isUser && (
										<>
											{user.seller && user.stripe_seller && (
												<Button
													variant="contained"
													disabled
													className={
														classes.stripe_connected
													}
												>
													Stripe connected
												</Button>
											)}

											{user.seller &&
												!user.stripe_seller && (
													<a
														href={
															"https://connect.stripe.com/oauth/authorize?response_type=code&client_id=" +
															process.env
																.REACT_APP_CLIENT_ID +
															"&scope=read_write"
														}
														className={
															classes.stripe_connected
														}
													>
														<img
															src={stripeButton}
															alt="stripe_button"
														/>
													</a>
												)}
										</>
									)}
								</span>
							</div>
						</Card>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={12} lg={6}>
					<Reviews userId={match.params.userId} />
				</Grid>
			</Grid>
		</div>
	);
}

export default Profile;
