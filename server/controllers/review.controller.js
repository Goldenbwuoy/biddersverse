const Review = require("../models/review.model");
const errorHandler = require("../helpers/dbErrorHandler");

const create = async (req, res) => {
  const review = new Review(req.body);
  try {
    review.order = req.order;
    review.customer = req.order.buyer;
    review.seller = req.order.seller;
    await review.save();
    return res.status(200).json({
      message: "Review created",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listBySeller = async (req, res) => {
  try {
    const reviews = await Review.find({ seller: req.profile._id }).populate(
      "customer",
      "_id firstName lastName"
    );
    res.status(200).json(reviews);
  } catch (err) {
    // console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = { create, listBySeller };
