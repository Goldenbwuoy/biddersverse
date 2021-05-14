import {
	Collapse,
	Container,
	Divider,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Paper,
	Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { listBySeller } from "./api-order";
import OrderUpdate from "./OrderUpdate";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	paper: theme.mixins.gutters({
		maxWidth: 900,
		margin: "auto",
		padding: theme.spacing(3),
		marginTop: theme.spacing(5),
	}),
	title: {
		margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
			1
		)}px`,
		color: theme.palette.openTitle,
		fontSize: "1.2em",
	},
	subheading: {
		marginTop: theme.spacing(1),
		color: "#434b4e",
		fontSize: "1.1em",
	},
	customerDetails: {
		paddingLeft: "36px",
		paddingTop: "16px",
		backgroundColor: "#f8f8f8",
	},
}));

function SellerOrders() {
	const classes = useStyles();
	const { user, token } = auth.isAuthenticated();
	const [orders, setOrders] = useState([]);
	const [open, setOpen] = useState(0);

	useEffect(() => {
		const abortcontroller = new AbortController();
		const signal = abortcontroller.signal;

		listBySeller(
			{
				userId: user._id,
			},
			{ token: token },
			signal
		).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
		return function cleanup() {
			abortcontroller.abort();
		};
	}, [user._id, token]);

	const handleClick = (index) => (event) => {
		setOpen(index);
	};

	return (
		<Container className={classes.root} component="main" maxWidth="xl">
			<Paper className={classes.paper} elevation={4}>
				<h3 className="cards__header">Orders For Items Sold</h3>
				{orders?.length ? (
					<List dense>
						{orders.map((order, index) => {
							return (
								<span key={index}>
									<ListItem
										button
										onClick={handleClick(index)}
									>
										<ListItemText
											primary={"Order # " + order._id}
											secondary={new Date(
												order.createdAt
											).toDateString()}
										/>
										{open === index ? (
											<ExpandLess />
										) : (
											<ExpandMore />
										)}
									</ListItem>
									<Divider />
									<Collapse
										component="li"
										in={open === index}
										timeout="auto"
										unmountOnExit
									>
										<OrderUpdate
											order={order}
											orderIndex={index}
										/>
										<div
											className={classes.customerDetails}
										>
											<Typography
												type="subheading"
												component="h3"
												className={classes.subheading}
											>
												Deliver to:
											</Typography>
											<Typography
												type="subheading"
												component="h3"
												color="primary"
											>
												<strong>{`${order.buyer.firstName} ${order.buyer.lastName}`}</strong>{" "}
												({order.email})
											</Typography>
											<Typography
												type="subheading"
												component="h3"
												color="primary"
											>
												{order.buyer.address?.street}
											</Typography>
											<Typography
												type="subheading"
												component="h3"
												color="primary"
											>
												{order.buyer.address?.city},{" "}
												{order.buyer.address?.zipcode}
											</Typography>
											<Typography
												type="subheading"
												component="h3"
												color="primary"
											>
												{order.buyer.address?.country}
											</Typography>
											<br />
										</div>
									</Collapse>
									<Divider />
								</span>
							);
						})}
					</List>
				) : (
					<div
						style={{
							padding: `20px 10px`,
							backgroundColor: "#3f3f3f0d",
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

export default SellerOrders;
