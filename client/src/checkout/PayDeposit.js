import { makeStyles } from "@material-ui/core";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import auth from "../auth/auth-helper";
import { getDepositAmount, getImage } from "../helpers/auction-helper";
import { payDeposit } from "../auction/api-auction";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2),
	},
}));

function PayDeposit({ auction, updateAuction }) {
	const classes = useStyles();

	const { user } = auth.isAuthenticated();
	console.log(user);
	const amount = getDepositAmount(auction) * 100;

	const deposit = async (token) => {
		const body = {
			token: token,
			order: {
				email: token.email,
				amount: amount,
			},
		};

		payDeposit(
			{ userId: user._id, auctionId: auction._id },
			{ token: auth.isAuthenticated().token }
		).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				console.log("Joined auction");
				console.log(data);
				updateAuction(data);
			}
		});
	};

	return (
		<div className={classes.root}>
			<StripeCheckout
				image={getImage(auction.images[0])}
				label="Pay Deposit"
				email={user.email}
				name="Pay Deposit"
				amount={amount}
				stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
				token={deposit}
			/>
		</div>
	);
}

export default PayDeposit;
