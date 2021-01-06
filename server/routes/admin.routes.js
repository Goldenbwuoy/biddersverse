const express = require("express");
const adminCtrl = require("../controllers/admin.controller");
const router = express.Router();

router.route("/api/admin").post(adminCtrl.create);

module.exports = router;
