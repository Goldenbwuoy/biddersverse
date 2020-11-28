const formidable = require("formidable");
const Auction = require("../models/auction.model");
const errorHandler = require("../helpers/dbErrorHandler");
const fs = require("fs");

const create = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be uploaded",
      });
    }
    let auction = new Auction(fields);
    auction.seller = req.profile;
    if (files.image) {
      auction.image.data = fs.readFileSync(files.image.path);
      auction.image.contentType = files.image.type;
    }
    try {
      let result = await auction.save();
      res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const listOpen = async (req, res) => {
  try {
    let auctions = await Auction.find({ bidEnd: { $gt: new Date() } })
      .sort("bidStart")
      .populate("seller", "_id name")
      .populate("bids.bidder", "_id name");
    console.log(auctions);
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const listByBidder = async (req, res) => {
  try {
    let auctions = await Auction.find({ "bids.bidder": req.profile._id })
      .populate("seller", "_id name")
      .populate("bids.bidder", "_id name");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const auctionByID = async (req, res, next, id) => {
  try {
    let auction = await Auction.findById(id)
      .populate("seller", "_id name")
      .populate("bids.bidder", "_id name")
      .exec();
    if (!auction)
      return res.status("400").json({
        error: "Auction not found",
      });
    req.auction = auction;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve auction",
    });
  }
};

const read = (req, res) => {
  req.auction.image = undefined;
  return res.json(req.auction);
};

const photo = (req, res, next) => {
  if (req.auction.image.data) {
    res.set("Content-Type", req.auction.image.contentType);
    return res.send(req.auction.image.data);
  }
  next();
};

const listBySeller = async (req, res) => {
  try {
    let auctions = await Auction.find({ seller: req.profile._id })
      .populate("seller", "_id name")
      .populate("bids.bidder", "_id name");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = {
  create,
  listOpen,
  listByBidder,
  listBySeller,
  auctionByID,
  photo,
  read,
};
