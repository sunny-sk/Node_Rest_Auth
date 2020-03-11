const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost/playground")
//   .then(params => {
//     console.log("connected");
//   })
//   .catch(() => {
//     console.log("not connected");
//   });

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" }
  })
);

async function createAuthor(name, bio, website) {
  try {
    const author = new Author({
      name,
      bio,
      website
    });
    const result = await author.save();
    console.log(result);
  } catch (error) {}
}
async function createCourse(name, author) {
  try {
    const course = new Course({
      name,
      author
    });
    const result = await course.save();
    console.log(result);
  } catch (error) {}
}

async function listCourses() {
  try {
    const course = await Course.find().populate("author");
    console.log(course);
  } catch (error) {}
}

const x = new Date("2020-03-11T10:57:39.099+00:00");

const h = new Intl.DateTimeFormat("en", {
  hour: "numeric"
}).format(x);
const m = new Intl.DateTimeFormat("en", {
  minute: "numeric"
}).format(x);
const s = new Intl.DateTimeFormat("en", {
  second: "numeric"
}).format(x);

const t1 = parseInt(h.split(" ")[0]) * 60 * 60 + parseInt(m) * 60 + parseInt(s);

setInterval(() => {
  const p = new Date();
  const h1 = new Intl.DateTimeFormat("en", {
    hour: "numeric"
  }).format(p);
  const m1 = new Intl.DateTimeFormat("en", {
    minute: "numeric"
  }).format(p);
  const s1 = new Intl.DateTimeFormat("en", {
    second: "numeric"
  }).format(p);
  const t2 =
    parseInt(h1.split(" ")[0]) * 60 * 60 + parseInt(m1) * 60 + parseInt(s1);

  if (Math.abs(t1 - t2) > 60) {
    console.log("not valid");
  } else {
    console.log("valid");
  }
}, 1000);
