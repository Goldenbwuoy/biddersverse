const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
const orderCtrl = require("../controllers/order.controller");

router
  .route("/api/orders/:userId")
  .post(authCtrl.requireSignin, userCtrl.stipeCustomer, orderCtrl.create);

router.param("userId", userCtrl.userByID);

module.exports = router;
