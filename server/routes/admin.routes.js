const express = require("express");
const adminCtrl = require("../controllers/admin.controller");
const authCtrl = require("../controllers/auth.controller");
const router = express.Router();

router.route("/api/admin").post(adminCtrl.create).get(adminCtrl.list);

router.route("/api/admin/signin").post(authCtrl.adminSignin);

router
  .route("/api/admin/users")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.listUsers);

router
  .route("/api/admin/auctions")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.listAuctions);

router
  .route("/api/admin/orders")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.listOrders);

module.exports = router;
