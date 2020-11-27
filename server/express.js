import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import auctionRoutes from "./routes/auction.routes.js";
import morgan from "morgan";

const app = express();

app.use("/static", express.static("assets/images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", auctionRoutes);

/* To handle auth-related errors thrown by express-jwt when it tries to validate JWT
tokens in incoming requests */
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
  }
});

export default app;
