const express = require("express");
const router = express.Router();

const { Genre, validateGenre } = require("../model/genre.model");

router.get("/", async (req, res, next) => {
  try {
    const genres = await Genre.find().sort("name");
    res.status(200).send({ success: true, genres });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send({ success: false, result: "not found" });
    res.status(200).send(genre);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validateGenre(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.status(201).send({ success: true, genre });
  } catch (error) {}
});

router.put("/:id", async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send({ success: false, result: "not found" });
  res.status(200).send({ success: true, genre });
});

module.exports = router;
