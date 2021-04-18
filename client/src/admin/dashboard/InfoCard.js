import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: 35,
		fontWeight: "bold",
		color: "#fff",
	},
	detail: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
}));

function InfoCard({ background, info }) {
	const classes = useStyles();
	return (
		<Paper
			style={{ height: 100, backgroundColor: background, padding: 10 }}
		>
			<Typography className={classes.heading}>{info.number}</Typography>
			<Typography className={classes.detail}>{info.detail}</Typography>
		</Paper>
	);
}

export default InfoCard;
