const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

const Rental = new mongoose.model("Rental", rentalSchema);

function validationRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  });
  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validationRental = validationRental;
module.exports.rentalSchema = rentalSchema;
