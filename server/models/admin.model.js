const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    console.log(err);
  }
});

AdminSchema.methods.authenticate = async function (plainText) {
  return await bcrypt.compare(plainText, this.password);
};

module.exports = mongoose.model("Admin", AdminSchema);
