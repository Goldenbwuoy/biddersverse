const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		auction: { type: mongoose.Schema.ObjectId, ref: "Auction" },
		seller: { type: mongoose.Schema.ObjectId, ref: "User" },
		status: {
			type: String,
			enum: [
				"Not Processed",
				"Processing",
				"Shipped",
				"Delivered",
				"Cancelled",
			],
			default: "Not Processed",
		},
		email: {
			type: String,
			trim: true,
			match: [/.+\@.+\..+/, "Please fill a valid email address"],
			required: "Email is required",
		},
		amount: {
			type: Number,
			required: "Amount is required",
		},
		buyer: { type: mongoose.Schema.ObjectId, ref: "User" },
		reviewed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
