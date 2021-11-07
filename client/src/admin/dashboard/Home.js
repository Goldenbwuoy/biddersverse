import {
	Card,
	CardMedia,
	Container,
	Divider,
	Grid,
	makeStyles,
	Paper,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import RecentOrders from "../orders/RecentOrders";
import InfoCard from "./InfoCard";
import { dashboardSummary } from "../api-admin";
import auth from "../../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
	imageCard: {
		maxWidth: 1000,
	},
	media: {
		minHeight: 400,
	},
	content: {
		flexGrow: 1,
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		backgroundColor: "#80808024",
	},
	fixedHeight: {
		height: 140,
	},
	links: {
		textDecoration: "none",
		color: "white",
	},
}));

function Home() {
	const [summary, setSummary] = useState({});
	const classes = useStyles();
	const { token } = auth.isAdminAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		dashboardSummary({ token: token }, signal).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setSummary(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	console.log(summary);
	return (
		<main className={classes.content}>
			<div className={classes.appBarSpacer} />
			<Container maxWidth="lg" className={classes.container}>
				<div style={{ marginBottom: 10 }}>
					<Typography variant="h5">Dashboard</Typography>
					<Divider />
				</div>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={3}>
						<InfoCard
							background="rgba(221, 86, 28, 0.3)"
							info={{
								detail: "Registered Users",
								number: summary?.registeredUsers,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<InfoCard
							background="rgba(0, 102, 55, 0.3)"
							info={{
								detail: "Active Listings",
								number: summary?.activeListings,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<InfoCard
							background="rgba(187, 0, 0, 0.3)"
							info={{
								detail: "Listings with Bids",
								number: summary?.listingsWithBids,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<InfoCard
							background="rgba(23, 212, 252, 0.3)"
							info={{
								detail: "Total Listings",
								number: summary?.totalListings,
							}}
						/>
					</Grid>
					{/* Recent Orders */}
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<RecentOrders />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}

export default Home;
