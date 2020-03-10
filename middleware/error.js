const winston = require("winston");

module.exports = function(err, req, res, next) {
  res
    .status(500)
    .send({ success: false, code: 500, message: "Something failed" });
};
