const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "missing auth token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const _user = await User.findById(decoded._id);
    if (!_user)
      return res
        .send(400)
        .send({ success: false, code: 400, message: "invalid user id" });
    const prevTime = new Date(_user.sessionTime);
    const newTime = new Date();
    const h = new Intl.DateTimeFormat("en", {
      hour: "numeric"
    }).format(prevTime);
    const m = new Intl.DateTimeFormat("en", {
      minute: "numeric"
    }).format(prevTime);
    const s = new Intl.DateTimeFormat("en", {
      second: "numeric"
    }).format(prevTime);
    const h1 = new Intl.DateTimeFormat("en", {
      hour: "numeric"
    }).format(newTime);
    const m1 = new Intl.DateTimeFormat("en", {
      minute: "numeric"
    }).format(newTime);
    const s1 = new Intl.DateTimeFormat("en", {
      second: "numeric"
    }).format(newTime);

    const t2 =
      parseInt(h1.split(" ")[0]) * 60 * 60 + parseInt(m1) * 60 + parseInt(s1);
    const t1 =
      parseInt(h.split(" ")[0]) * 60 * 60 + parseInt(m) * 60 + parseInt(s);

    if (Math.abs(t1 - t2) < 60) {
      _user.sessionTime = new Date();
      await _user.save();
      req.user = decoded;
      next();
    } else {
      res.status(400).send({
        success: false,
        code: 400,
        message: "session Time out please Login"
      });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: "invalid token" });
  }
}

module.exports = auth;
