function res404(res) {
  res.status(404).send({ success: false, code: 404, result: "not found" });
}

module.exports.res404 = res404;
