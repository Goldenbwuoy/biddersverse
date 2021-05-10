import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import queryString from "querystring";
import auth from "../auth/auth-helper";
import { stripeUpdate } from "./api-user";
import Connecting from "../assets/images/connecting.gif";
import Connected from "../assets/images/connected.png";
import Failed from "../assets/images/failed.png";

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 600,
		margin: "auto",
		padding: theme.spacing(3),
		marginTop: theme.spacing(5),
	}),
	title: {
		margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px ${theme.spacing(
			2
		)}px`,
		color: theme.palette.openTitle,
		fontSize: 24,
	},
	subheading: {
		color: theme.palette.openTitle,
		marginLeft: "24px",
	},
	status: {
		display: "flex",
		justifyContent: "center",
	},
	image: {
		width: "150px",
		objectFit: "contain",
		marginTop: 40,
	},
}));
function StripeConnect(props) {
	const classes = useStyles();
	const [values, setValues] = useState({
		error: false,
		connecting: false,
		connected: false,
	});
	const { user, token } = auth.isAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const parsed = queryString.parse(props.location.search);
		console.log(parsed);
		if (parsed.error) {
			setValues({ ...values, error: true });
		}
		if (parsed.code) {
			setValues({ ...values, connecting: true, error: false });
			//   send a post request to stripe, get credential and update user data
			stripeUpdate(
				{
					userId: user._id,
				},
				{ token: token },
				parsed.code,
				signal
			).then((data) => {
				console.log(data);
				if (data && data.error) {
					setValues({ ...values, error: true, connected: false });
				} else {
					setValues({
						...values,
						connected: true,
						connecting: false,
						error: false,
					});
				}
			});
		}
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	const Status = (status) => {
		return (
			<div className={classes.status}>
				<img
					className={classes.image}
					src={status === "connecting" ? Connecting : Connected}
					alt=""
				/>
			</div>
		);
	};

	return (
		<div style={{ height: "100vh" }}>
			<Paper className={classes.root} elevation={4}>
				<Typography type="title" className={classes.title}>
					Stripe Account Connection
				</Typography>
				{values.error && (
					<>
						<Typography
							type="subheading"
							className={classes.subheading}
						>
							Failed to connect your stripe account
						</Typography>
						<div className={classes.status}>
							<img
								className={classes.image}
								src={Failed}
								alt=""
							/>
						</div>
					</>
				)}
				{values.connecting && <Status status="connecting" />}
				{values.connected && (
					<>
						<Typography
							type="subheading"
							className={classes.subheading}
						>
							Your Stripe account is successfully connected
						</Typography>
						<Status status="connected" />
					</>
				)}
			</Paper>
		</div>
	);
}

export default StripeConnect;
