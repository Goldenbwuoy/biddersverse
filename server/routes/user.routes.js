const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router.route("/api/users/confirmation/:token").get(userCtrl.confirmEmail);

router
	.route("/api/users/profile/:userId")
	.get(
		authCtrl.requireSignin,
		userCtrl.wonByUser,
		userCtrl.bidsByUser,
		userCtrl.allAuctionsByUser,
		userCtrl.soldAuctionsByUser,
		userCtrl.get_stats
	);

router
	.route("/api/users/:userId")
	.get(authCtrl.requireSignin, userCtrl.read)
	.put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
	.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router
	.route("/api/stripe_auth/:userId")
	.put(
		authCtrl.requireSignin,
		authCtrl.hasAuthorization,
		userCtrl.stripe_auth,
		userCtrl.update
	);

router.route("/api/users/photo/:userId").get(userCtrl.photo);
// router.route("/api/users/defaultPhoto").get(userCtrl.defaultPhoto);

router.param("userId", userCtrl.userByID);

module.exports = router;
