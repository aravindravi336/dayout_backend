const express = require("express");
const router = express.Router();
const multer = require("multer");
const Blog = require("../models/BlogModel");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

// Add blog post
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, feedback, rating } = req.body;
    let image = null;

    // Check if image was uploaded
    if (req.file) {
      image = req.file.path; // Assuming multer saves the file path in req.file.path
    }

    // Create a new instance of the Blog model with the received data
    const newBlog = new Blog({
      name,
      feedback,
      image,
      rating
    });

    // Save the new blog post to the database
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
