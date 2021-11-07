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
			html: text,
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
					NotifyWinner(item.itemName, item.bids[0].bidder)
						.then((resp) => {
							console.log("Winner Notified");
							NotifySeller(item, true)
								.then((result) => {
									console.log("Seller Notified");
								})
								.catch((err) => {
									console.log(err.message);
								});
						})
						.catch((err) => {
							console.log(err.message);
						});
				} else {
					NotifySeller(item, false);
				}
			});
	});
};

const NotifyWinner = async (itemName, winner) => {
	const text = `<p>Congratulations ${winner.firstName} ${winner.lastName}, You have won the auction for ${itemName}. Login to the system and pay for the item within 72 hours from the time this email is received.</br>Thanks for bidding with biddersverse.</br></br><b>Biddersverse</b></br><i>The Universe for Bidders:)</i></p>`;
	try {
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: winner.email,
			subject: "Auction Win Notification",
			html: text,
		});
	} catch (err) {
		console.log("failed to notify the winner" + err);
	}
};

const NotifySeller = async (auction, sold) => {
	const { itemName } = auction;
	const { firstName, lastName, email } = auction.seller;
	const text = sold
		? `<p>Hello, ${firstName} ${lastName}, Your auction for ${itemName} has ended and the item was sold.</br> Check and see who has won it!!</br></br><b>Biddersverse</b></br><i>The Universe for Bidders:)</i></p>`
		: `<p>Hello, ${firstName} ${firstName}, Your auction for ${itemName} has ended.</br>No bids were placed before the end of the auction. You can login to the system and relist the product.</p>`;

	try {
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: "End of Auction Notification",
			html: text,
		});
	} catch (err) {
		console.log("failed to notify the seller" + err);
	}
};

module.exports = {
	outbidNotification,
	scheduleNotification,
	emailConfirmation,
};
