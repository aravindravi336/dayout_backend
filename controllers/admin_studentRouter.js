const express = require("express");
const Admin_Student = require("../models/Admin_Student");

const router = express.Router();

// Add student package
router.post("/add", async (req, res) => {
  try {
    let input = req.body;
    let newPackage = new Admin_Student(input);
    let output = await newPackage.save();
    res.json({
      status: "success",
      data: output
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong in adding a package for students"
    });
  }
});

// View all student packages
router.get("/viewall", async (req, res) => {
  try {
    const packages = await Admin_Student.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching all student packages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Search student packages by price range
router.get("/search/:minPrice/:maxPrice", async (req, res) => {
  try {
    // Extract minPrice and maxPrice from request parameters
    const { minPrice, maxPrice } = req.params;

    // Find student packages within the specified budget range
    const packages = await Admin_Student.find({
      price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
    });

    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching student packages by budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete student package by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPackage = await Admin_Student.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting student package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
