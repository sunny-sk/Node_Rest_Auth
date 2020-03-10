const Joi = require("@hapi/joi");

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

module.exports.validateGenre = validateGenre;
