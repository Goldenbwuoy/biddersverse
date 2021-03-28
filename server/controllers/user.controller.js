const User = require("../models/user.model.js");
const Auction = require("../models/auction.model");
const errorHandler = require("../helpers/dbErrorHandler.js");
const extend = require("lodash/extend");
const formidable = require("formidable");
const fs = require("fs");
const request = require("request");
const stripe = require("stripe");
const jwt = require("jsonwebtoken");
const { emailConfirmation } = require("../helpers/emailNotificationsHandler");

// initialize stripe instance with the application's secret key
const myStripe = stripe(process.env.STRIPE_TEST_SECRET_KEY);

const create = async (req, res) => {
	const user = new User(req.body);
	try {
		const savedUser = await user.save();

		// const emailToken = jwt.sign({ _id: savedUser._id }, config.jwtSecret, {
		//   expiresIn: "1d",
		// });

		// emailConfirmation(req.body.email, emailToken);

		return res.status(200).json({
			message: emailToken,
		});
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};
const list = async (req, res) => {
	try {
		let users = await User.find().select(
			"firstName lastName email createdAt updatedAt confirmed"
		);
		res.json(users);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const confirmEmail = async (req, res) => {
	try {
		const { _id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
		await User.updateOne({ _id: _id }, { confirmed: true });
		res.status(201).json({ message: "Email confirmed" });
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: "Confirmation failed" });
	}
};
const userByID = async (req, res, next, id) => {
	try {
		let user = await User.findById(id);
		if (!user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		req.profile = user;
		next();
	} catch (err) {
		return res.status(400).json({
			error: "could not retrieve user",
		});
	}
};
const read = async (req, res) => {
	req.profile.password = undefined;
	return res.json(req.profile);
};

const update = async (req, res) => {
	try {
		let user = req.profile;
		user = extend(user, req.body);
		await user.save();
		user.password = undefined;
		res.json(user);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};
const remove = async (req, res) => {
	try {
		let user = req.profile;
		let deletedUser = await user.remove();
		deletedUser.password = undefined;
		res.json(deletedUser);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const photo = (req, res, next) => {
	if (req.profile.photo.data) {
		res.set("Content-Type", req.profile.photo.contentType);
		return res.send(req.profile.photo.data);
	}
	next();
};

const isSeller = (req, res, next) => {
	const isSeller = req.profile && req.profile.seller;
	if (!isSeller) {
		return res.status(403).json({
			error: "User is not a seller",
		});
	}
	next();
};

const stripe_auth = (req, res, next) => {
	request(
		{
			url: "https://connect.stripe.com/oauth/token",
			method: "POST",
			json: true,
			body: {
				client_secret: process.env.STRIPE_TEST_SECRET_KEY,
				code: req.body.stripe,
				grant_type: "authorization_code",
			},
		},
		(error, response, body) => {
			if (body.error) {
				return res.status(400).json({
					error: body.error_description,
				});
			}
			console.log(body);
			req.body.stripe_seller = body;
			next();
		}
	);
};

/**The function receives a card token from the frontend and uses it to either
 * create a new Stripe Customer or update an existing one
 */
const createCustomer = async (req, res, next) => {
	if (req.profile.stripe_customer) {
		next();
	} else {
		// create a new stripe customer and update the user with the new customer id
		try {
			const customer = await myStripe.customers.create({
				email: req.profile.email,
			});
			try {
				const user = await User.findOneAndUpdate(
					{ _id: req.profile._id },
					{ stripe_customer: customer.id },
					{ new: true }
				);
				req.profile = user;
				next();
			} catch (err) {
				return res.status(400).send({
					error: errorHandler.getErrorMessage(err),
				});
			}
		} catch (err) {
			return res.status(400).send({
				error: err.message,
			});
		}
	}
};

/**Create a charge on behalf of the seller on the the bidder's credit card for the cost of the item ordered */
const createCharge = async (req, res, next) => {
	console.log(req.body.order);
	console.log(req.body.token);
	console.log(req.profile);

	try {
		const application_fee = 0.01 * req.body.order.amount;
		await myStripe.charges.create(
			{
				amount: req.body.order.amount,
				currency: "usd",
				source: req.body.token.id,
				application_fee_amount: application_fee,
			},
			{
				stripeAccount:
					req.body.order.seller.stripe_seller.stripe_user_id,
			}
		);
		next();
	} catch (err) {
		console.log("Could not create charge");
		return res.status(400).json({ error: err.message });
	}
};

const get_stats = (req, res) => {
	const stats = {
		wonByUser: req.wonAuctions.length,
		bidsByUser: req.bidAuctions.length,
		auctionsPosted: req.profile.seller
			? req.auctionsByUser.length
			: undefined,
		soldAuctions: req.profile.seller ? req.soldByUser.length : undefined,
	};

	return res.status(200).json({ profile: req.profile, stats });
};

const wonByUser = async (req, res, next) => {
	try {
		const wonAuctions = await Auction.find({
			"bids.bidder": req.profile._id,
			bidEnd: { $lt: new Date() },
			"bids.0.bidder": req.profile._id,
		});
		req.wonAuctions = wonAuctions;
		next();
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const bidsByUser = async (req, res, next) => {
	try {
		let auctions = await Auction.find({ "bids.bidder": req.profile._id });
		req.bidAuctions = auctions;
		next();
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const allAuctionsByUser = async (req, res, next) => {
	if (!req.profile.seller) next();

	try {
		let auctions = await Auction.find({ seller: req.profile._id });
		req.auctionsByUser = auctions;
		next();
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const soldAuctionsByUser = async (req, res, next) => {
	if (!req.profile.seller) next();

	try {
		let auctions = await Auction.find({
			seller: req.profile._id,
			bidEnd: { $lt: new Date() },
			$where: "this.bids.length > 0",
		});
		req.soldByUser = auctions;
		next();
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

module.exports = {
	create,
	userByID,
	read,
	list,
	remove,
	update,
	photo,
	isSeller,
	stripe_auth,
	createCustomer,
	createCharge,
	confirmEmail,
	get_stats,
	wonByUser,
	bidsByUser,
	allAuctionsByUser,
	soldAuctionsByUser,
};
