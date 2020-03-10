const Joi = require("@hapi/joi");

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

module.exports.validateMovie = validateMovie;
