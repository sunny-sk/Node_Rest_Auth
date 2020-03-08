const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../model/user.model");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  try {
    const { error } = validate(req.body);
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

    const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);

    res.status(200).send({ success: true, message: "loggedIn", token: token });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

function validate(user) {
  const scheme = Joi.object({
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
