const Order = require("../models/order.model");
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

const listLatest = async (req, res) => {
  try {
    let orders = await Order.find({})
      .sort("-createdAt")
      .limit(5)
      .populate("product.seller", "_id firstName lastName")
      .populate("product.auction", "_id itemName bids")
      .populate("user", "_id firstName lastName");
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const OrderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id)
      .populate("product.auction", "_id itemName bids")
      .exec();
    if (!order) {
      return res.status(400).json({ error: "Order not found" });
    }
    req.order = order;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  return res.json(req.order);
};

const isWinner = async (req, res, next) => {
  const isWinner = req.order && req.auth && req.order.user == req.auth._id;
  if (!isWinner) {
    return res.status("403").json({
      error: "Not authorized to view this order",
    });
  }
  next();
};

const getStatusValues = (req, res) => {
  res.json(Order.schema.path("product.status").enumValues);
};

const isSeller = (req, res, next) => {
  console.log(req.order);
  const isSeller =
    req.order && req.auth && req.order.product.seller._id == req.auth._id;
  if (!isSeller) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const update = async (req, res) => {
  try {
    let order = await Order.updateOne(
      { _id: req.order._id },
      { "product.status": req.body.status }
    );
    res.json(order);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const setReviewed = async (req, res, next) => {
  try {
    await Order.updateOne({ _id: req.order._id }, { reviewed: true });
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = {
  create,
  listBySeller,
  listByBuyer,
  listLatest,
  getStatusValues,
  OrderById,
  read,
  isWinner,
  isSeller,
  update,
  setReviewed,
};
