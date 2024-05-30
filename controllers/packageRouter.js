const express = require("express");
const router = express.Router();
const Package = require("../models/Package");

// Create a package booking
router.post("/add", async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json({
      status: 'success',
      data: savedPackage
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all package bookings
router.get("/viewallpackage", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id
    let data = await Package.findByIdAndDelete(id)
    if (!data) {
      return res.json({
        status: "error",
        message: 'Package not found'
      })
    }
    return res.json({
      status: 'success',
      message: 'successfully deleted package'
    })
  } catch (error) {

  }
})


module.exports = router;


