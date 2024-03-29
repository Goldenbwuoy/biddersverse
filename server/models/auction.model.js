const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema(
	{
		itemName: {
			type: String,
			trim: true,
			required: "Item name is required",
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: "Category",
			required: "Product category is required",
		},
		description: {
			type: String,
			trim: true,
		},
		images: {
			type: Array,
			required: "Images are required",
		},
		bidStart: {
			type: Date,
			default: Date.now,
		},
		bidEnd: {
			type: Date,
			required: "Auction end time is required",
		},
		startingBid: {
			type: Number,
			default: 0,
		},
		seller: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		bids: [
			{
				bidder: { type: mongoose.Schema.ObjectId, ref: "User" },
				bid: Number,
				time: Date,
			},
		],
		bidders: [
			{
				bidder: { type: mongoose.Schema.ObjectId, ref: "User" },
			},
		],
		messages: [
			{
				sender: { type: mongoose.Schema.ObjectId, ref: "User" },
				message: String,
				time: Date,
			},
		],
		purchased: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Auction", AuctionSchema);
