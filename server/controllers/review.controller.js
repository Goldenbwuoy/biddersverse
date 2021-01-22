const Review = require("../models/review.model");
const errorHandler = require("../helpers/dbErrorHandler");

const create = async (req, res) => {
  const review = new Review(req.body);
  try {
    review.order = req.order;
    review.customer = req.order.user;
    review.seller = req.order.product.seller;
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

module.exports = { create };
