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
  ticketType: { // New field for ticket type
    type: String,
    required: true, // Not required initially, but may be filled based on the tickets option
  },
  phone: {
    type: Number,
    required: true,
  }
});

const StudentPackage = mongoose.model("Student_packages", userSchema);

module.exports = StudentPackage;
