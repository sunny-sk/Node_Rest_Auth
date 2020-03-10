function admin(req, res, next) {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send({ success: false, code: 403, message: "Access-denied" });
  next();
}

module.exports = admin;
