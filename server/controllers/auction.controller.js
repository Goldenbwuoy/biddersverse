import formidable from "formidable";
import Auction from "../models/auction.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";
import fs from "fs";

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

export default { create, listOpen, listByBidder, listBySeller };
