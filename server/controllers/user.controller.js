const User = require("../models/user.model.js");
const errorHandler = require("../helpers/dbErrorHandler.js");
const extend = require("lodash/extend");
const formidable = require("formidable");
const fs = require("fs");
const request = require("request");
const stripe = require("stripe");
const jwt = require("jsonwebtoken");
const { emailConfirmation } = require("../helpers/emailNotificationsHandler");

// initialize stripe instance with the application's secret key
const myStripe = stripe(process.env.STRIPE_TEST_SECRET_KEY);

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();

    // const emailToken = jwt.sign({ _id: savedUser._id }, config.jwtSecret, {
    //   expiresIn: "1d",
    // });

    // emailConfirmation(req.body.email, emailToken);

    return res.status(200).json({
      message: emailToken,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select(
      "firstName lastName email createdAt updatedAt confirmed"
    );
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const confirmEmail = async (req, res) => {
  try {
    const { _id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await User.updateOne({ _id: _id }, { confirmed: true });
    res.status(201).json({ message: "Email confirmed" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Confirmation failed" });
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
  try {
    let user = req.profile;
    user = extend(user, req.body);
    await user.save();
    user.password = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
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

const stripe_auth = (req, res, next) => {
  request(
    {
      url: "https://connect.stripe.com/oauth/token",
      method: "POST",
      json: true,
      body: {
        client_secret: process.env.STRIPE_TEST_SECRET_KEY,
        code: req.body.stripe,
        grant_type: "authorization_code",
      },
    },
    (error, response, body) => {
      if (body.error) {
        return res.status(400).json({
          error: body.error_description,
        });
      }
      console.log(body);
      req.body.stripe_seller = body;
      next();
    }
  );
};

/**The function receives a card token from the frontend and uses it to either
 * create a new Stripe Customer or update an existing one
 */
const stipeCustomer = (req, res, next) => {
  if (req.profile.stripe_customer) {
    // update stripe customer
    myStripe.customers.update(
      req.profile.stripe_customer,
      {
        source: req.body.token,
      },
      (err, customer) => {
        if (err) {
          return res.status(400).send({
            error: "Could not update the charge details",
          });
        }
        req.body.order.payment_id = customer.id;
        next();
      }
    );
  } else {
    // create a new stripe customer
    myStripe.customers
      .create({
        email: req.profile.email,
        source: req.body.token,
      })
      .then((customer) => {
        User.update(
          { _id: req.profile._id },
          { $set: { stripe_customer: customer.id } },
          (err, order) => {
            if (err) {
              return res.status(400).send({
                error: errorHandler.getErrorMessage(err),
              });
            }
            req.body.order.payment_id = customer.id;
            next();
          }
        );
      });
  }
};

/**Create a charge on behalf of the seller on the the bidder's credit card for the cost of the item ordered */
const createCharge = (req, res, next) => {
  if (!req.profile.stripe_seller) {
    return res.status(400).json({
      error: "Please connect your Stripe account",
    });
  }
  myStripe.tokens
    .create(
      {
        customer: req.order.payment_id,
      },
      { stripeAccount: req.profile.stripe_seller.stipe_user_id }
    )
    .then((token) => {
      myStripe.charges
        .create(
          {
            amount: req.body.amount * 100,
            currency: "usd",
            source: token.id,
          },
          {
            stripeAccount: req.profile.stripe_seller.stipe_user_id,
          }
        )
        .then((charge) => {
          next();
        });
    });
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
  stripe_auth,
  stipeCustomer,
  createCharge,
  confirmEmail,
};
