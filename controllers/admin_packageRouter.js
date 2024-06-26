const express = require("express");
const Admin_Package = require("../models/Admin_Package");

const router = express.Router();

// Add package
router.post("/add", async (req, res) => {
  try {
    let input = req.body;
    let newPackage = new Admin_Package(input);
    let output = await newPackage.save();
    res.json({
      status: "success",
      data: output
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong in adding a package"
    });
  }
});

// View all packages
router.get("/viewall", async (req, res) => {
  try {
    const packages = await Admin_Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching all packages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Search packages by price range
router.get("/search/:minPrice/:maxPrice", async (req, res) => {
  try {
    // Extract minPrice and maxPrice from request parameters
    const { minPrice, maxPrice } = req.params;

    // Find packages within the specified budget range
    const packages = await Admin_Package.find({
      price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
    });

    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages by budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete package by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Admin_Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;




