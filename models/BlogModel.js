const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    data: Buffer
    
  },
  rating: {
    type: String,
    required: true,
  }
});

const blog_var = mongoose.model("blog", userSchema);

module.exports = blog;
