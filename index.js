const express = require("express");
const app = express();
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
require("colors");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "development") {
  console.log("in development mode");
}
if (!process.env.PRIVATE_KEY) {
  console.log("fetal Error".red);
  process.exit(1);
}

app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const courses = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/user");
const auth = require("./routes/auth");
const error = require("./middleware/error");

app.use("/api/genres/", courses);
app.use("/api/customers/", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
  mongoose
    .connect("mongodb://localhost/videly")
    .then(res => {
      console.log("connected to mongoDB".cyan);
    })
    .catch(err => {
      console.log("Mongodb Error".red, err.message.red);
    });
});
