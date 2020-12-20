const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    product: {
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
    },
    first_name: {
      type: String,
      trim: true,
      required: "First Name is required",
    },
    last_name: {
      type: String,
      trim: true,
      required: "Last Name is required",
    },
    email: {
      type: String,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
    },
    delivery_address: {
      street: { type: String, required: "Street is required" },
      city: { type: String, required: "City is required" },
      province: { type: String },
      zipcode: { type: String, required: "Zip Code is required" },
      country: { type: String, required: "Country is required" },
    },
    payment_id: {},
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
