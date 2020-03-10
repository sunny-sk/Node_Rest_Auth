const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const { User } = require("../model/user.model");
const {
  validateUpdateProfile,
  validateResetPassword,
  validateLogin
} = require("../validations/user.validation");

router.post("/login", async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(400)
        .send({ success: false, message: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.status(200).send({ success: true, message: "loggedIn", token: token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateProfile", async (req, res, next) => {
  try {
    const { error } = validateUpdateProfile(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, code: 400, message: error.details[0].message });

    let user = await User.findById(req.body.userId);
    if (!user) return res.send("not found user");

    user.userData = _.pick(req.body, ["firstName", "lastName", "bio"]);

    await user.save();

    res.send(user);
  } catch (error) {}
});
router.post("/resetPassword", async (req, res, next) => {
  try {
    const { error } = validateResetPassword(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, code: 400, message: error.details[0].message });

    let user = await User.findById(req.body.userId);
    if (!user) return res.send("not found user");

    user.userData = _.pick(req.body, ["firstName", "lastName", "bio"]);

    await user.save();

    res.send(user);
  } catch (error) {}
});

module.exports = router;
