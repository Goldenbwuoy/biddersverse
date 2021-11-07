import React, { useState, useEffect } from "react";
import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import auth from "../../auth/auth-helper";
import { listRecentOrders } from "../api-admin";
import OrdersTable from "./OrdersTable";

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 1450,
		margin: "auto",
		padding: theme.spacing(1),
	}),
	title: {
		margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
			1
		)}px`,
		color: theme.palette.openTitle,
		fontSize: "1.3em",
	},
}));

function RecentOrders() {
	const [orders, setOrders] = useState([]);
	const { token } = auth.isAdminAuthenticated();
	const classes = useStyles();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		listRecentOrders({ token: token }, signal).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
	}, [token]);

	return (
		<div>
			<Paper className={classes.root} elevation={4}>
				<Typography type="title" className={classes.title}>
					Recent Orders
				</Typography>
				<Divider />
				<OrdersTable orders={orders} />
			</Paper>
		</div>
	);
}

export default RecentOrders;
