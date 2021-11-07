import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AuctionCardItem from "./AuctionCardItem";

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		paddingTop: theme.spacing(1),
		backgroundColor: "#fff",
	}),
	title: {
		marginTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
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
					return (
						<div>
							<AuctionCardItem auction={item} />;
						</div>
					);
				})}
			</Paper>
		</div>
	);
}

export default Suggestions;
