const express = require("express");
const adminCtrl = require("../controllers/admin.controller");
const authCtrl = require("../controllers/auth.controller");
const categoryCtrl = require("../controllers/category.controller");
const userCtrl = require("../controllers/user.controller");
const auctionCtrl = require("../controllers/auction.controller");
const orderCtrl = require("../controllers/order.controller");
const router = express.Router();

router.route("/api/admin").post(adminCtrl.create).get(adminCtrl.list);

router.route("/api/admin/signin").post(authCtrl.adminSignin);

router
	.route("/api/admin/users")
	.get(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.listUsers)
	.post(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.createUser);

router
	.route("/api/admin/users/:userId")
	.delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.remove)
	.get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.read)
	.put(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.update);

router
	.route("/api/admin/auctions")
	.get(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.listAuctions);

router
	.route("/api/admin/auctions/:auctionId")
	.delete(authCtrl.requireSignin, authCtrl.isAdmin, auctionCtrl.remove)
	.put(authCtrl.requireSignin, authCtrl.isAdmin, auctionCtrl.update);

router
	.route("/api/admin/orders")
	.get(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.listOrders);

router
	.route("/api/admin/orders/recent")
	.get(authCtrl.requireSignin, authCtrl.isAdmin, orderCtrl.listLatest);

router
	.route("/api/admin/categories")
	.get(authCtrl.requireSignin, authCtrl.isAdmin, categoryCtrl.list)
	.post(authCtrl.requireSignin, authCtrl.isAdmin, categoryCtrl.create);

router
	.route("/api/admin/categories/:categoryId")
	.delete(authCtrl.requireSignin, authCtrl.isAdmin, categoryCtrl.remove)
	.put(authCtrl.requireSignin, authCtrl.isAdmin, categoryCtrl.update)
	.get(authCtrl.requireSignin, authCtrl.isAdmin, categoryCtrl.read);

router.param("userId", userCtrl.userByID);
router.param("auctionId", auctionCtrl.auctionByID);
router.param("categoryId", categoryCtrl.categoryById);

module.exports = router;
