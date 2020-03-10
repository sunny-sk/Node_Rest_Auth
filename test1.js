const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(params => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

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

// createAuthor("sunny", "myBio", "myWebsite");
// createCourse("node course", "5e64bff8086c512c82990394");
listCourses();
