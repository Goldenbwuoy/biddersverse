const formidable = require("formidable");
const Auction = require("../models/auction.model");
const errorHandler = require("../helpers/dbErrorHandler");
const schedule = require("node-schedule");
const fs = require("fs");
const { extend } = require("lodash");
const notificationHandler = require("../helpers/emailNotificationsHandler");

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
      // notificationHandler.scheduleNotification(result);
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
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
    console.log(auctions);
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const search = async (req, res) => {
  const query = {};
  if (req.query.search)
    query.itemName = { $regex: req.query.search, $options: "i" };
  if (req.query.category && req.query.category !== "All")
    query.category = req.query.category;

  try {
    let auctions = await Auction.find({ ...query, bidEnd: { $gt: new Date() } })
      .select("-image")
      .exec();
    res.json(auctions);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const listRelated = async (req, res) => {
  try {
    let auctions = await Auction.find({
      _id: { $ne: req.auction },
      bidEnd: { $gt: new Date() },
      category: req.auction.category,
    }).limit(5);
    res.status(200).json(auctions);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const listOpenByCategory = async (req, res) => {
  try {
    let auctions = await Auction.find({
      category: req.category,
      bidEnd: { $gt: new Date() },
    })
      .sort("bidStart")
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const listByBidder = async (req, res) => {
  try {
    let auctions = await Auction.find({ "bids.bidder": req.profile._id })
      .select("-image")
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listOpenByBidder = async (req, res) => {
  try {
    let auctions = await Auction.find({
      "bids.bidder": req.profile._id,
      bidEnd: { $gt: new Date() },
    })
      .select("-image")
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listWonByBidder = async (req, res) => {
  try {
    let auctions = await Auction.find({
      "bids.bidder": req.profile._id,
      bidEnd: { $lt: new Date() },
      "bids.0.bidder": req.profile._id,
    })
      .select("-image")
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
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
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName")
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

const listAllBySeller = async (req, res) => {
  try {
    let auctions = await Auction.find({ seller: req.profile._id })
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listOpenBySeller = async (req, res) => {
  try {
    let auctions = await Auction.find({
      seller: req.profile._id,
      bidEnd: { $gt: new Date() },
    })
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listSoldBySeller = async (req, res) => {
  try {
    let auctions = await Auction.find({
      seller: req.profile._id,
      bidEnd: { $lt: new Date() },
      $where: "this.bids.length > 0",
    })
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listLatest = async (req, res) => {
  try {
    let auctions = await Auction.find({ bidEnd: { $gt: new Date() } })
      .select("-image")
      .sort("-createdAt")
      .limit(5)
      .populate("seller", "_id firstName lastName")
      .populate("bids.bidder", "_id firstName lastName");
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listPopular = async (req, res) => {
  try {
    const auctions = await Auction.aggregate([
      { $match: { bidEnd: { $gt: new Date() } } },
      {
        $project: {
          itemName: 1,
          startingBid: 1,
          bidStart: 1,
          bidEnd: 1,
          bids: 1,
          bidCount: { $size: "$bids" },
        },
      },
      { $sort: { bidsCount: -1 } },
      { $limit: 10 },
    ]).exec();
    res.json(auctions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isSeller = (req, res, next) => {
  const isSeller =
    req.auction && req.auth && req.auction.seller._id == req.auth._id;
  if (!isSeller) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Photo could not be uploaded",
      });
    }
    let auction = req.auction;
    auction = extend(auction, fields);
    auction.updated = Date.now();
    if (files.image) {
      auction.image.data = fs.readFileSync(files.image.path);
      auction.image.contentType = files.image.type;
    }
    try {
      let result = await auction.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const remove = async (req, res) => {
  try {
    let auction = req.auction;
    await auction.remove();
    return res.status(200).json({ message: "Auction deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const setPurchased = async (req, res, next) => {
  try {
    const auctionId = req.body.order.auction._id;
    await Auction.findOneAndUpdate({ _id: auctionId }, { purchased: true });
    next();
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
  listAllBySeller,
  listOpenBySeller,
  listSoldBySeller,
  listPopular,
  auctionByID,
  photo,
  read,
  listOpenByCategory,
  listLatest,
  remove,
  isSeller,
  update,
  listRelated,
  search,
  listOpenByBidder,
  listWonByBidder,
  setPurchased,
};
