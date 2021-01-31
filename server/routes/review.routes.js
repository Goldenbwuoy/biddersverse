const router = require("express").Router();
const reviewCtrl = require("../controllers/review.controller");
const userCtrl = require("../controllers/user.controller");

router.route("/api/reviews/user/:userId").get(reviewCtrl.listBySeller);

router.param("userId", userCtrl.userByID);
module.exports = router;
