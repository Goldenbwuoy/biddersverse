const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("./../config/config");
const Admin = require("../models/admin.model");

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });

    const authenticated = await user.authenticate(req.body.password);
    if (!authenticated) {
      return res.status(401).json({ error: "Invalid password" });
    }
    if (!user.confirmed) {
      return res
        .status(401)
        .json({ error: "Please verify your email to login" });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        seller: user.seller,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: "Could not sign in" });
  }
};
const signout = (req, res) => {};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  /**
     * The req.auth object is populated by express-jwt in requireSignin after
        authentication verification, while req.profile is populated by the userByID
        function in user.controller.js
     */
  const authorized = req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

const adminSignin = async (req, res) => {
  try {
    let admin = await Admin.findOne({ name: req.body.name });
    if (!admin) return res.status(401).json({ error: "Admin not found" });

    const authenticated = await admin.authenticate(req.body.password);
    if (!authenticated) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ _id: admin._id, isAdmin: true }, config.jwtSecret);
    return res.json({
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: "Could not sign in" });
  }
};

const isAdmin = (req, res, next) => {
  const authorized = req.auth && req.auth.isAdmin;
  if (!authorized) {
    return res.status(403).json({
      error: "Authorization failed. Only the Admin is Authorized",
    });
  }
  next();
};

module.exports = {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  adminSignin,
  isAdmin,
};
