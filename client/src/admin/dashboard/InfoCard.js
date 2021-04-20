import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: 35,
		fontWeight: "bold",
		color: "#000",
	},
	detail: {
		color: "#636363",
		fontSize: 16,
		fontWeight: "bold",
	},
}));

function InfoCard({ background, info }) {
	const classes = useStyles();
	return (
		<Paper
			style={{
				height: 100,
				boxShadow: `0 6px 20px ${background}`,
				padding: 10,
			}}
		>
			<Typography className={classes.heading}>{info.number}</Typography>
			<Typography className={classes.detail}>{info.detail}</Typography>
		</Paper>
	);
}

export default InfoCard;
