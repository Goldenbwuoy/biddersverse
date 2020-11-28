const User = require("../models/user.model.js");
const errorHandler = require("../helpers/dbErrorHandler.js");
const extend = require("lodash/extend");
const formidable = require("formidable");
const fs = require("fs");

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email createdAt updatedAt");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "could not retrieve user",
    });
  }
};
const read = async (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};
const update = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    console.log(fields, files);
    if (err) {
      console.log(err.message);
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    let user = req.profile;
    user = extend(user, fields);
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    try {
      await user.save();
      user.password = undefined;
      res.json(user);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.password = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

const isSeller = (req, res, next) => {
  const isSeller = req.profile && req.profile.seller;
  if (!isSeller) {
    return res.status(403).json({
      error: "User is not a seller",
    });
  }
  next();
};

module.exports = {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  photo,
  isSeller,
};
