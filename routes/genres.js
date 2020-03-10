const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validateGenre } = require("../model/genre.model");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort("name");
    res.status(200).send({ success: true, genres });
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send({ success: false, result: "not found" });
    res.status(200).send(genre);
  })
);

router.post(
  "/",
  asyncMiddleware(auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.status(201).send({ success: true, genre });
  })
);

router.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details);

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name
      },
      {
        new: true
      }
    );
    if (!genre)
      return res.status(404).send({ success: false, result: "not found" });
    res.status(200).send({ success: true, genre });
  })
);

router.delete(
  "/:id",
  [auth, admin],
  asyncMiddleware(async (req, res, next) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
      return res.status(404).send({ success: false, result: "not found" });
    res.status(200).send({ success: true, genre });
  })
);

module.exports = router;
