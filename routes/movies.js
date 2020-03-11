const express = require("express");
const router = express.Router();
const { Movie } = require("../model/movie.model");
const { validateMovie } = require("../validations/movie.validation");
const { Genre } = require("../model/genre.model");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).send({ success: true, movies });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).send({ success: false, result: "not found" });
    res.status(200).send({ success: true, movie });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", [auth, admin], async (req, res, next) => {
  try {
    const { error } = validateMovie(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });

    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
      return res.status(404).send({ success: false, result: "not found" });
    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.status(201).send({ success: true, movie });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", [auth, admin], async (req, res, next) => {
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
      return res
        .status(404)
        .send({ success: false, result: "genre not found" });

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      },
      {
        new: true
      }
    );
    if (!movie)
      return res
        .status(404)
        .send({ success: false, result: "movie not found" });
    res.status(200).send({ success: true, movie });
  } catch (error) {
    console.log("error", error);
  }
});

router.delete("/:id", [auth, admin], async (req, res, next) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send({ success: false, result: "not found" });
  res.status(200).send({ success: true, movie });
});

module.exports = router;
