const Joi = require("@hapi/joi");

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.ObjectId().required(),
    movieId: Joi.ObjectId().required()
  });
  return schema.validate(rental);
}

module.exports.validateRental = validateRental;
