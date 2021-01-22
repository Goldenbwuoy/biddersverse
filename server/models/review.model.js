const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    anonymous: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
