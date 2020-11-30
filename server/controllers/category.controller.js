const Category = require("../models/category.model");
const errorHandler = require("../helpers/dbErrorHandler");

const create = async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    return res.status(201).json({ message: "Category created successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    const categories = await Category.find().select("_id categoryName");
    res.status(200).json(categories);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      res.status(400).json({ error: "Category not found" });
    }
    req.category = category;
    next();
  } catch (err) {}
};

module.exports = { create, list, categoryById };
