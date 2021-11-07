const Category = require("../models/category.model");
const errorHandler = require("../helpers/dbErrorHandler");
const extend = require("lodash/extend");

const create = async (req, res) => {
	const category = new Category(req.body);
	try {
		const newCategory = await category.save();
		return res.status(201).json(newCategory);
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

const read = (req, res) => {
	return res.json(req.category);
};

const update = async (req, res) => {
	try {
		let category = req.category;
		category = extend(category, req.body);
		const newCategory = await category.save();
		res.json(newCategory);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const remove = async (req, res) => {
	try {
		let category = req.category;
		await category.remove();
		return res
			.status(200)
			.json({ message: "Category deleted successfully" });
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

module.exports = { create, list, categoryById, read, update, remove };
