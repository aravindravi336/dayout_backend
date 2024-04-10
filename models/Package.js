const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  no_of_people: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  package_type: {
    type: String,
    required: true,
  }
});

const Package = mongoose.model("Packages", userSchema);

module.exports = Package;
