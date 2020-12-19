const { Order, AuctionItem } = require("../models/order.model");
const errorHandler = require("../helpers/dbErrorHandler");

const create = async (req, res) => {
  try {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    let result = await order.save();
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listBySeller = async (req, res) => {
  try {
    let orders = await Order.find({ "product.seller": req.profile._id })
      .populate("product.auction", "_id itemName bids")
      .sort("-createAt")
      .exec();
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByBuyer = async (req, res) => {
  try {
    let orders = await Order.find({ user: req.profile._id })
      .sort("-createAt")
      .exec();
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getStatusValues = (req, res) => {
  res.json(AuctionItem.schema.path("status").enumValues);
};

module.exports = { create, listBySeller, listByBuyer, getStatusValues };
