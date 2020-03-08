const express = require("express");
const app = express();
require("colors");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
app.use(morgan("tiny"));

if (process.env.NODE_ENV === "development") {
  console.log("in development mode");
} else {
  console.log("production mode");
}
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// routes
const courses = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
app.use("/api/genres/", courses);
app.use("/api/customers/", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

//local server
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
