const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  inst_email: {
    type: String,
    required: true,
  },
  no_of_students: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  tickets: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  }
});

const StudentPackage = mongoose.model("Student_packages", userSchema);

module.exports = StudentPackage;
