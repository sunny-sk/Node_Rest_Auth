const Joi = require("@hapi/joi");

function validateCustomer(customer) {
  const scheme = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .trim()
      .required(),
    phone: Joi.string()
      .required()
      .min(10)
      .max(10),
    isGold: Joi.boolean()
  });
  return scheme.validate(customer);
}

module.exports.validateCustomer = validateCustomer;
