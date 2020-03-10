const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../model/user.model");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send({ success: false, message: "user already registered" });

    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res
      .status(201)
      .header("x-auth-token", token)
      .send({
        success: true,
        userData: _.pick(user, ["name", "email", "registerDate"])
      });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
