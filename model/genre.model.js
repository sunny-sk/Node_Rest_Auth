const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    min: 5,
    max: 50
  }
});
const Genre = new mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const scheme = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .trim()
      .required()
  });
  return scheme.validate(genre);
}

module.exports.genreSchema = genreSchema;
module.exports.validateGenre = validateGenre;
module.exports.Genre = Genre;
