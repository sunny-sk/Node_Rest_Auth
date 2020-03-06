const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

const genres = [
  {
    id: 1,
    name: "course1"
  },
  {
    id: 2,
    name: "course2"
  },
  {
    id: 3,
    name: "course3"
  }
];

router.get("/", (req, res, next) => {
  res.status(200).send(genres);
});

router.get("/:id", (req, res, next) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("not found");

  res.status(200).send(genre);
});

router.post("/", (req, res, next) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res, next) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("not found");

  const { error } = validategenre(req.body);
  if (error) return res.status(400).send(error.details);

  genre.name = req.body.name;
  res.status(200).send(genre);
});

router.delete("/:id", (req, res, next) => {
  console.log(typeof req.params.id);
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.status(200).send(genres);
});

module.exports = router;

function validateGenre(genre) {
  const scheme = Joi.object({
    name: Joi.string()
      .min(5)
      .required()
  });
  return scheme.validate(genre);
}
