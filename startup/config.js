const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const app = express();

module.exports = function() {
  app.use(morgan("tiny"));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
};
