const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  console.log("generating token");
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.PRIVATE_KEY
  );
};
const User = new mongoose.model("User", userSchema);

function validateUser(user) {
  const scheme = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .trim()
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });
  return scheme.validate(user);
}

module.exports.validateUser = validateUser;
module.exports.User = User;
