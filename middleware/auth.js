const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "missing auth token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ success: false, message: "invalid token" });
  }
}

module.exports = auth;
