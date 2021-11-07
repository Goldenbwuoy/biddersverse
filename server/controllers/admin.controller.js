const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const Auction = require("../models/auction.model");
const Order = require("../models/order.model");
const errorHandler = require("../helpers/dbErrorHandler");

const create = async (req, res) => {
	const admin = new Admin(req.body);
	try {
		await admin.save();
		return res.status(200).json({
			message: "Successfully created!",
		});
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const createUser = async (req, res) => {
	const user = new User(req.body);
	try {
		const savedUser = await user.save();
		return res.status(200).json(savedUser);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const list = async (req, res) => {
	try {
		const admins = await Admin.find({});
		return res.status(200).json(admins);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const listUsers = async (req, res) => {
	try {
		const users = await User.find({});
		return res.status(200).json(users);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const listAuctions = async (req, res) => {
	try {
		const auctions = await Auction.find({})
			.select("-image")
			.populate("seller", "_id firstName lastName")
			.populate("category", "_id categoryName")
			.populate("bids.bidder", "_id firstName lastName");
		return res.status(200).json(auctions);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const listOrders = async (req, res) => {
	try {
		const orders = await Order.find({})
			.populate("seller", "_id firstName lastName")
			.populate("auction", "_id itemName bids")
			.populate("buyer", "_id firstName lastName");
		return res.status(200).json(orders);
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const registeredUsers = async (req, res, next) => {
	try {
		let users = await User.find({});
		req.registeredUsers = users;
		next();
	} catch (err) {
		return res
			.status(400)
			.json({ error: errorHandler.getErrorMessage(err) });
	}
};
const allListings = async (req, res, next) => {
	try {
		let auctions = await Auction.find({});
		req.totalListings = auctions;
		next();
	} catch (err) {
		return res
			.status(400)
			.json({ error: errorHandler.getErrorMessage(err) });
	}
};

const activeListings = async (req, res, next) => {
	try {
		let auctions = await Auction.find({ bidEnd: { $gt: new Date() } });
		req.activeListings = auctions;
		next();
	} catch (err) {
		return res
			.status(400)
			.json({ error: errorHandler.getErrorMessage(err) });
	}
};

const listingsWithBids = async (req, res, next) => {
	try {
		let auctions = await Auction.find({
			bidEnd: { $gt: new Date() },
			$where: "this.bids.length > 0",
		});
		req.listingsWithBids = auctions;
		next();
	} catch (err) {
		return res
			.status(400)
			.json({ error: errorHandler.getErrorMessage(err) });
	}
};

const dashboardSummary = (req, res) => {
	const listings = {
		registeredUsers: req.registeredUsers.length,
		totalListings: req.totalListings.length,
		activeListings: req.activeListings.length,
		listingsWithBids: req.listingsWithBids.length,
	};

	return res.status(200).json(listings);
};

module.exports = {
	create,
	createUser,
	list,
	listUsers,
	listAuctions,
	listOrders,
	registeredUsers,
	allListings,
	activeListings,
	listingsWithBids,
	dashboardSummary,
};
