const express = require("express");
const categoryCtrl = require("../controllers/category.controller");
const router = express.Router();

router
  .route("/api/categories")
  .get(categoryCtrl.list)
  .post(categoryCtrl.create);

module.exports = router;
