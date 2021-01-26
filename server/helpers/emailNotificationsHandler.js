const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const Auction = require("../models/auction.model");

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailConfirmation = async (email, token) => {
  const url = `http://localhost:3000/confirm/${token}`;
  const message = `<p>Please click the link below to confirm your email: <br /> <a href="${url}">${url}</a> </p>`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Address Confirmation",
      html: message,
    });
    console.log("email sent successfully");
  } catch (err) {
    console.log(err);
  }
};

const outbidNotification = async (auction) => {
  const { firstName, lastName, email } = auction.bids[1].bidder;
  const { itemName } = auction;
  const text = `Hello, ${firstName} ${lastName}, you have been outbid in the auction for ${itemName}. You can login to the system and bid again before the auction ends`;

  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Auction Outbid Notification",
      text: text,
    });
    console.log("email sent successfully");
  } catch (err) {
    console.log(err);
  }
};

const scheduleNotification = (auction) => {
  console.log("scheduled");
  const { bidEnd } = auction;
  const job = schedule.scheduleJob(bidEnd, async () => {
    console.log("auction ended");
    Auction.findOne({ bidEnd: bidEnd })
      .populate("seller", "_id firstName lastName email")
      .populate("bids.bidder", "_id firstName lastName email")
      .then((item) => {
        if (item.bids.length) {
          NotifyWinner(item.itemName, item.bids[0].bidder);
          NotifySeller(item, true);
        } else {
          NotifySeller(item, false);
        }
      });
  });
};

const NotifyWinner = async (itemName, winner) => {
  const text = `Congratulations ${winner.firstName} ${winner.lastName}, You have won the auction for ${itemName}. Login to the system and pay for the item within 72 hours from the time this email is received. Thanks for bidding with biddersverse:)`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: winner.email,
      subject: "Auction Win Notification",
      text: text,
    });
    console.log("winner notified");
  } catch (err) {
    console.log("failed to notify the winner" + err);
  }
};

const NotifySeller = async (auction, sold) => {
  const { itemName } = auction;
  const { firstName, lastName, email } = auction.seller;
  const text = sold
    ? `Hello, ${firstName} ${lastName}, Your auction for ${itemName} has ended and the item was sold. Check it and see who has won it!!`
    : `Hello, ${firstName} ${firstName}, Your auction for ${itemName} has ended. No bids were placed before the end of the auction.`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "End of Auction Notification",
      text: text,
    });
    console.log("seller notified");
  } catch (err) {
    console.log("failed to notify the seller" + err);
  }
};

module.exports = {
  outbidNotification,
  scheduleNotification,
  emailConfirmation,
};
