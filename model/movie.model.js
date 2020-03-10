const mongoose = require("mongoose");

const { genreSchema } = require("./genre.model");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  }
});

const Movie = new mongoose.model("Movie", movieSchema);

module.exports.Movie = Movie;
module.exports.movieSchema = movieSchema;
