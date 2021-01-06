const Admin = require("../models/admin.model");
const errorHandler = require("../helpers/dbErrorHandler");

const create = async (req, res) => {
  const admin = new Admin(req.body);
  try {
    await admin.save();
    return res.status(200).json({
      message: "Successfully created!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = {
  create,
};
