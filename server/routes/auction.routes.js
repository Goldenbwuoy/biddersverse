import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import userCtrl from "../controllers/user.controller.js";
import auctionCtrl from "../controllers/auction.controller.js";

const router = express.Router();

router
  .route("/api/auctions/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.isSeller,
    auctionCtrl.create
  );

router.param("userId", userCtrl.userByID);

export default router;
