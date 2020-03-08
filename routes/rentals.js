const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Rental, validationRental } = require("../model/rental.model");
const { Movie } = require("../model/movie.model");
const { Customer } = require("../model/customer.model");
const Fawn = require("fawn");
Fawn.init(mongoose);

router.get("/", async (req, res, next) => {
  try {
    const rentals = await Rental.find()
      .populate("movie", { __v: 0 })
      .populate("customer", { __v: 0 })
      .select({ __v: 0 });
    res.status(200).send(rentals);
  } catch (error) {}
});
router.get("/:id", async (req, res, next) => {
  try {
    const rentals = await Rental.findById(req.params.id)
      .populate("movie", { __v: 0 })
      .populate("customer", { __v: 0 })
      .select({ __v: 0 });
    if (!rentals)
      return res.status(404).send({ success: false, message: "not found" });
    res.status(200).send(rentals);
  } catch (error) {}
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validationRental(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });

    const movie = await Movie.findById(req.body.movieId);
    if (!movie)
      return res
        .status(404)
        .send({ success: false, message: "movie not found" });

    const customer = await Customer.findById(req.body.customerId);
    if (!customer)
      return res
        .status(404)
        .send({ success: false, message: "customer not found" });

    if (movie.numberInStock === 0)
      return res
        .status(400)
        .send({ success: false, message: "Movie not in stock" });

    let rental = new Rental({
      customer: req.body.customerId,
      movie: req.body.movieId
    });

    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: {
            numberInStock: -1
          }
        }
      )
      .run();
    res.status(201).send({ success: true, rental });
  } catch (error) {
    console.log(error);
    res.status(500).send("something failed");
  }
});

module.exports = router;
