const express = require("express");
const app = express();
require("colors");
require("dotenv").config();
const morgan = require("morgan");

const helmet = require("helmet");
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("in development mode");
}
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const courses = require("./routes/genres");
app.use("/api/genres/", courses);

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
