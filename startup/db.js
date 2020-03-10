const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
module.exports = function() {
  mongoose
    .connect("mongodb://localhost/videly")
    .then(res => {
      console.log("connected to mongoDB".cyan);
    })
    .catch(err => {
      console.log("Mongodb Error".red, err.message.red);
    });
};
