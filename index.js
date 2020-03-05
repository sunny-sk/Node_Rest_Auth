const express = require("express");
const app = express();
const color = require("colors");
require("dotenv").config();
const morgan = require("morgan");
const Joi = require("@hapi/joi");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const courses = [
  {
    id: 1,
    name: "course1"
  },
  {
    id: 2,
    name: "course1"
  },
  {
    id: 3,
    name: "course1"
  }
];

app.get("/api/courses", (req, res, next) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res, next) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("not found");

  res.send(course);
});

app.post("/api/courses", (req, res, next) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res, next) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details);

  course.name = req.body.name;
  res.status(200).send(course);
});

app.delete("/api/courses/:id", (req, res, next) => {
  console.log(typeof req.params.id);
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.status(200).send(courses);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});

function validateCourse(course) {
  const scheme = Joi.object({
    name: Joi.string()
      .min(5)
      .required()
  });
  return scheme.validate(course);
}
