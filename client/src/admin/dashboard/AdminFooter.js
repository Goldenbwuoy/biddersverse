import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	footer: {
		position: "sticky",
		padding: theme.spacing(3, 2),
		marginTop: "auto",
		backgroundColor:
			theme.palette.type === "light" ? "#000" : theme.palette.grey[800],
	},
}));

const Copyright = () => (
	<div>
		<Typography
			style={{ color: "#fff", display: "flex", alignItems: "center" }}
			variant="body2"
			color="textSecondary"
		>
			{"Copyright © "}
			<Link
				style={{
					textDecoration: "none",
					color: "#fff",
					fontSize: 18,
					marginRight: 10,
				}}
				to="/admin/home"
			>
				Biddersverse
			</Link>
			{new Date().getFullYear()}
			{"."}
		</Typography>
	</div>
);

function AdminFooter() {
	const classes = useStyles();
	return (
		<footer className={classes.footer}>
			<Container maxWidth="sm">
				<Copyright />
			</Container>
		</footer>
	);
}

export default AdminFooter;
