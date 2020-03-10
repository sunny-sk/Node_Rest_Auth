const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre } = require("../model/genre.model");
const { validateGenre } = require("../validations/genre.validation");
const asyncMiddleware = require("../middleware/async");
const { res404 } = require("../utils/response");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort("name");
    res
      .status(200)
      .send({ success: true, code: 200, count: genres.length, genres });
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res404(res);

    res.status(200).send({ success: true, code: 200, genre });
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, code: 400, error: error.details[0].message });
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.status(201).send({ success: true, code: 200, genre });
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
    if (!genre) return res404(res);
    res.status(200).send({ success: true, code: 200, genre });
  })
);

router.delete(
  "/:id",
  [auth, admin],
  asyncMiddleware(async (req, res, next) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res404(res);
    res.status(200).send({ success: true, code: 200, genre });
  })
);

module.exports = router;
