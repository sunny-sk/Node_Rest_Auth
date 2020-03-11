const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const userProfileDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  bio: {
    type: String,
    minlength: 5,
    maxlength: 255,
    trim: true
  }
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  userData: {
    default: null,
    type: Object
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
  token: String,
  sessionTime: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  console.log("generating token");
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.PRIVATE_KEY
  );
};
const User = new mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.userProfileDataSchema = userProfileDataSchema;
