const Auction = require("../models/auction.model");

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("connection established");
    socket.on("join auction room", (data) => {
      socket.join(data.room);
    });

    socket.on("leave auction room", (data) => {
      socket.leave(data.room);
    });

    socket.on("new bid", (data) => {
      bid(data.bidInfo, data.room);
    });

    socket.on("new message", (data) => {
      message(data.messageInfo, data.room);
    });
  });

  const bid = async (bid, auction) => {
    try {
      let result = await Auction.findOneAndUpdate(
        {
          _id: auction,
          $or: [{ "bids.0.bid": { $lt: bid.bid } }, { bids: { $eq: [] } }],
        },
        { $push: { bids: { $each: [bid], $position: 0 } } },
        { new: true }
      )
        .populate("bids.bidder", "_id name")
        .populate("seller", "_id name")
        .exec();

      io.to(auction).emit("new bid", result);
    } catch (err) {
      console.log(err);
    }
  };

  const message = async (message, auction) => {
    try {
      let result = await Auction.findOneAndUpdate(
        {
          _id: auction,
        },
        { $push: { messages: { $each: [message] } } },
        { new: true }
      ).exec();

      io.to(auction).emit("new message", result.messages);
    } catch (err) {
      console.log(err);
    }
  };
};
