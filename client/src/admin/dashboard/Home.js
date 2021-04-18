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
import React from "react";
import clsx from "clsx";
import HomeImage from "../../assets/images/homeImage.PNG";
import RecentOrders from "../orders/RecentOrders";
import InfoCard from "./InfoCard";

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
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
							background="#DD561C"
							info={{ detail: "Registered Users", number: 20 }}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<InfoCard
							background="green"
							info={{ detail: "Active Listings", number: 20 }}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<InfoCard
							background="#BB0000"
							info={{ detail: "Listings with Bids", number: 15 }}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<InfoCard
							background="#17D4FC"
							info={{ detail: "Total Listings", number: 50 }}
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
