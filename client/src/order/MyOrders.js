import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Divider,
	List,
	ListItem,
	ListItemText,
	Paper,
	Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import auth from "./../auth/auth-helper";
import { listByBuyer } from "./api-order";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		marginTop: theme.spacing(3),
	},
	Paper: theme.mixins.gutters({
		maxWidth: 900,
		margin: "auto",
		padding: theme.spacing(3),
		backgroundColor: "#3f3f3f0d",
	}),
	title: {
		margin: `${theme.spacing(2)}px 0 12px ${theme.spacing(1)}px`,
		color: theme.palette.openTitle,
	},
	link: {
		textDecoration: "none",
	},
}));

function MyOrders() {
	const classes = useStyles();
	const { user, token } = auth.isAuthenticated();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		listByBuyer(
			{
				userId: user._id,
			},
			{ token: token },
			signal
		).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				console.log(data);
				setOrders(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	return (
		<Container className={classes.root} component="main" maxWidth="xl">
			<Paper className={classes.Paper} elevation={4}>
				<h3 className="cards__header">Orders For Items Bought</h3>
				{orders?.length ? (
					<List dense>
						{orders.map((order) => (
							<span key={order._id}>
								<Link
									className={classes.link}
									to={`/order/${order._id}`}
								>
									<ListItem button>
										<ListItemText
											primary={
												<strong>
													{order.auction.itemName}
												</strong>
											}
											secondary={new Date(
												order.createdAt
											).toDateString()}
										/>
									</ListItem>
								</Link>
								<Divider />
							</span>
						))}
					</List>
				) : (
					<div
						style={{
							padding: `20px 10px`,
							backgroundColor: "#fff",
							borderRadius: 3,
						}}
					>
						<h4>No Orders Found!!</h4>
					</div>
				)}
			</Paper>
		</Container>
	);
}

export default MyOrders;
