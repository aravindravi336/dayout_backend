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
  }
});

const Admin_Package = mongoose.model("admin_packages", userSchema);

module.exports = Admin_Package;
