const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  package_name: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  package_type: {
    type: String,
    required: true,
  },
  image: {
    type: String
}
});

const Admin_Student = mongoose.model("admin_student", userSchema);

module.exports = Admin_Student;
