const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name is required",
    unique: "name already exists",
  },
  password: {
    type: String,
    required: "Password is required",
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
