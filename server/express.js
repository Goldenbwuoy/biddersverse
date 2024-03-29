const express = require("express");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const auctionRoutes = require("./routes/auction.routes.js");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const reviewRoutes = require("./routes/review.routes");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use("/static", express.static("assets/images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Enable pre-flight
app.options("*", cors());

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", auctionRoutes);
app.use("/", categoryRoutes);
app.use("/", orderRoutes);
app.use("/", adminRoutes);
app.use("/", reviewRoutes);

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

/* To handle auth-related errors thrown by express-jwt when it tries to validate JWT
tokens in incoming requests */
app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({ error: err.name + ": " + err.message });
	} else if (err) {
		res.status(400).json({ error: err.name + ": " + err.message });
	}
});

module.exports = app;
