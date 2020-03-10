const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});
const Genre = new mongoose.model("Genre", genreSchema);

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
