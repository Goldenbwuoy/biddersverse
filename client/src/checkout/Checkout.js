import { makeStyles } from "@material-ui/core";
import axios from "../config/axios";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import auth from "../auth/auth-helper";
import {
	getAuctionImage,
	getDepositAmount,
	getImage,
} from "../helpers/auction-helper";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2),
	},
}));

function Checkout({
	auction,
	setLoading,
	setRedirectToOrder,
	setOrderId,
	setPaymentError,
}) {
	const classes = useStyles();

	console.log(auction.seller);

	const { user } = auth.isAuthenticated();
	const amount = (auction.bids[0].bid - getDepositAmount(auction)) * 100;

	const placeOrder = async (token) => {
		const config = {
			headers: {
				Authorization: `Bearer ${auth.isAuthenticated().token}`,
			},
		};

		const body = {
			token: token,
			order: {
				auction: auction,
				seller: auction.seller,
				email: token.email,
				amount: amount,
			},
		};

		try {
			setLoading(true);
			const response = await axios.post(
				`/api/orders/${user._id}`,
				body,
				config
			);
			setLoading(false);
			setOrderId(response.data._id);
			setRedirectToOrder(true);
		} catch (err) {
			console.log(err);
			console.log(err.response.data);
			setPaymentError(err.response.data.error);
			setLoading(false);
		}
	};

	return (
		<div className={classes.root}>
			<StripeCheckout
				image={getImage(auction.images[0])}
				name={auction.itemName}
				email={user.email}
				amount={amount}
				alipay={true}
				stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
				token={placeOrder}
			/>
		</div>
	);
}

export default Checkout;
