const express = require("express");
const app = express();
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
require("colors");
require("dotenv").config();

if (process.env.NODE_ENV === "development") {
  console.log("in development mode");
}
if (!process.env.PRIVATE_KEY) {
  console.log("fetal Error".red);
  process.exit(1);
}

require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
