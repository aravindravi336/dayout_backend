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


// Add a route to check if a package is already booked
router.post("/checkbooking", async (req, res) => {
  try {
    const { institution, date } = req.body;
    const existingBooking = await StudentPackage.findOne({ institution, date });
    if (existingBooking) {
      res.status(400).json({ message: 'Package already booked for this institution and date' });
    } else {
      res.status(200).json({ message: 'Package available for booking' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all package bookings
router.get("/viewbookings", async (req, res) => {
  try {
    const packages = await StudentPackage.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single package booking
router.get("/getone/:id", getPackage, (req, res) => {
  res.json(res.package);
});

// Update a package booking
router.patch("/edit/:id", getPackage, async (req, res) => {
  try {
    if (req.body.institution != null) {
      res.package.institution = req.body.institution;
    }
    if (req.body.inst_email != null) {
      res.package.inst_email = req.body.inst_email;
    }
    if (req.body.no_of_students != null) {
      res.package.no_of_students = req.body.no_of_students;
    }
    if (req.body.date != null) {
      res.package.date = req.body.date;
    }
    if (req.body.tickets != null) {
      res.package.tickets = req.body.tickets;
    }
    if (req.body.ticketType != null) { // Update ticketType if provided
      res.package.ticketType = req.body.ticketType;
    }
    const updatedPackage = await res.package.save();
    res.json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a package booking
router.delete("/delete/:id", getPackage, async (req, res) => {
  try {
    await res.package.remove();
    res.json({ message: "Package booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPackage(req, res, next) {
  try {
    const package = await StudentPackage.findById(req.params.id);
    if (package == null) {
      return res.status(404).json({ message: "Package booking not found" });
    }
    res.package = package; // Attach the found package to res.package
    next(); // Call next to proceed with the request
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
