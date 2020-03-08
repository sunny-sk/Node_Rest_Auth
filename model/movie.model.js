const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(5)
      .max(50)
      .required(),
    dailyRentalRate: Joi.number()
      .integer()
      .min(5)
      .max(50)
      .required()
  });
  return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.movieSchema = movieSchema;
module.exports.validateMovie = validateMovie;
