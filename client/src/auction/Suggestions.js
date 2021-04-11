import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AuctionCardItem from "./AuctionCardItem";

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		padding: theme.spacing(1),
		paddingBottom: 24,
		backgroundColor: "#80808024",
	}),
	title: {
		margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
		color: theme.palette.openTitle,
		fontSize: "1.1em",
	},
}));

function Suggestions({ auctions, title }) {
	const classes = useStyles();
	return (
		<div>
			<Paper className={classes.root} elevation={4}>
				<Typography type="title" className={classes.title}>
					{title}
				</Typography>
				{auctions.map((item, i) => {
					return <AuctionCardItem auction={item} />;
				})}
			</Paper>
		</div>
	);
}

export default Suggestions;
