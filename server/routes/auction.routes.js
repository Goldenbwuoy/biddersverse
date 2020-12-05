const express = require("express");
const authCtrl = require("../controllers/auth.controller.js");
const userCtrl = require("../controllers/user.controller.js");
const auctionCtrl = require("../controllers/auction.controller.js");
const categoryCtrl = require("../controllers/category.controller");

const router = express.Router();

router.route("/api/auctions/related/:auctionId").get(auctionCtrl.listRelated);

router.route("/api/auctions").get(auctionCtrl.search);
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

router
  .route("/api/auctions/:auctionId")
  .delete(authCtrl.requireSignin, auctionCtrl.isSeller, auctionCtrl.remove)
  .put(authCtrl.requireSignin, auctionCtrl.isSeller, auctionCtrl.update);

router.route("/api/auctions/bid/:userId").get(auctionCtrl.listByBidder);

router.route("/api/auction/:auctionId").get(auctionCtrl.read);

router
  .route("/api/auctions/category/:categoryId")
  .get(auctionCtrl.listOpenByCategory);

router.route("/api/auctions/added/latest").get(auctionCtrl.listLatest);

router.route("/api/auctions/image/:auctionId").get(auctionCtrl.photo);

router.param("userId", userCtrl.userByID);
router.param("auctionId", auctionCtrl.auctionByID);
router.param("categoryId", categoryCtrl.categoryById);

module.exports = router;
