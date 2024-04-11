const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you're storing the image path
  },
  rating: {
    type: Number, // Assuming rating is numeric
    required: true,
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
