const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../model/user.model");
const {
  validateCheckUserExist,
  validateUser
} = require("../validations/user.validation");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send({ success: true, code: 200, user });
});

router.post("/register", async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, code: 400, message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send({
        success: false,
        code: 400,
        message: "eamil already registered"
      });

    user = await User.findOne({ userName: req.body.userName });
    if (user)
      return res.status(400).send({
        success: false,
        code: 400,
        message: "username already taken"
      });

    user = new User(
      _.pick(req.body, ["name", "email", "password", "userName"])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    console.log(user);
    res
      .status(201)
      .header("x-auth-token", token)
      .send({
        success: true,
        user: _.pick(user, [
          "_id",
          "email",
          "userName",
          "userData",
          "registerDate"
        ])
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/checkUserName", async (req, res, next) => {
  const { error } = validateCheckUserExist(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, code: 400, message: error.details[0].message });
  let user = await User.findOne({ userName: req.body.userName });
  if (user)
    return res.status(400).send({
      success: false,
      code: 400,
      message: "username already taken"
    });
  res
    .status(200)
    .send({ success: true, code: 200, message: "user name available" });
});

module.exports = router;
