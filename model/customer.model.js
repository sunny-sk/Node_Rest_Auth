const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  }
});

const Customer = new mongoose.model("Customer", customerSchema);

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

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
