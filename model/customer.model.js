const mongoose = require("mongoose");

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

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
