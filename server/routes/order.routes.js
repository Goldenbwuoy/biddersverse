const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
const orderCtrl = require("../controllers/order.controller");

router
  .route("/api/orders/:userId")
  .post(authCtrl.requireSignin, userCtrl.stipeCustomer, orderCtrl.create);

router
  .route("/api/orders/seller/:userId")
  .get(authCtrl.requireSignin, orderCtrl.listBySeller);

router
  .route("/api/orders/buyer/:userId")
  .get(authCtrl.requireSignin, orderCtrl.listByBuyer);

router.route("/api/order/:orderId").get(authCtrl.requireSignin, orderCtrl.read);

router.route("/api/orders/status_values").get(orderCtrl.getStatusValues);

router.param("userId", userCtrl.userByID);
router.param("orderId", orderCtrl.OrderById);

module.exports = router;
