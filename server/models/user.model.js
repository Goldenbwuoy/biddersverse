const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: "First Name is required",
    },
    lastName: {
      type: String,
      trim: true,
      required: "Last name is required",
    },
    email: {
      type: String,
      trim: true,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: "Last name is required",
    },
    about: {
      type: String,
      trim: true,
    },
    seller: {
      type: Boolean,
      default: false,
    },
    stripe_seller: {},
    stripe_customer: {},
    password: {
      type: String,
      required: "Password is required",
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
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

UserSchema.methods.authenticate = async function (plainText) {
  return await bcrypt.compare(plainText, this.password);
};

// UserSchema.path("password").validate(function (v) {
//   if (this.password && this.password.length < 6) {
//     this.invalidate("password", "Password must be at least 6 characters.");
//   }
//   if (this.isNew && !this.password) {
//     this.invalidate("password", "Password is required.");
//   }
// }, null);

module.exports = mongoose.model("User", UserSchema);
