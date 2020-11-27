import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import userCtrl from "../controllers/user.controller.js";
import auctionCtrl from "../controllers/auction.controller.js";
import auctionController from "../controllers/auction.controller.js";

const router = express.Router();

router.route("/api/auctions").get(auctionCtrl.listOpen);

router
  .route("/api/auctions/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.isSeller,
    auctionCtrl.create
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    auctionCtrl.listBySeller
  );

router.route("/api/auctions/bid/:userId").get(auctionCtrl.listByBidder);

router.route("/api/auctions/image/:auctionId").get(auctionCtrl.photo);

router.param("userId", userCtrl.userByID);
router.param("auctionId", auctionCtrl.auctionByID);

export default router;
