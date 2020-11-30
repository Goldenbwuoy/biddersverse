const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: "Category name is required",
    unique: "Category already exists",
  },
});

module.exports = mongoose.model("Category", CategorySchema);
