const authCtrl = require("../controllers/auth.controller.js");
const express = require("express");

const router = express.Router();

router.route("/api/signin").post(authCtrl.signin);

module.exports = router;
