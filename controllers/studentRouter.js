const express = require("express");
const router = express.Router();
const StudentPackage = require("../models/StudentPackage");

// Create a package booking
router.post("/addstudentpackage", async (req, res) => {
  try {
    const newPackage = new StudentPackage(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all package bookings
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single package booking
router.get("/:id", getPackage, (req, res) => {
  res.json(res.package);
});

// Update a package booking
router.patch("/:id", getPackage, async (req, res) => {
  try {
    if (req.body.name != null) {
      res.package.name = req.body.name;
    }
    if (req.body.email != null) {
      res.package.email = req.body.email;
    }
    if (req.body.no_of_people != null) {
      res.package.no_of_people = req.body.no_of_people;
    }
    if (req.body.date != null) {
      res.package.date = req.body.date;
    }
    const updatedPackage = await res.package.save();
    res.json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a package booking
router.delete("/:id", getPackage, async (req, res) => {
  try {
    await res.package.remove();
    res.json({ message: "Package booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPackage(req, res, next) {
  let package;
  try {
    package = await Package.findById(req.params.id);
    if (package == null) {
      return res.status(404).json({ message: "Package booking not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.package = package;
  next();
}

module.exports = router;


