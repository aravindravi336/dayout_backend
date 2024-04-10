const express = require("express");
const adminPackageModel = require("../models/Admin_Package");
const Admin_Package = require("../models/Admin_Package");


const router = express.Router()

router.post("/add", async (req, res) => {
  try {
    let input = req.body
    let newPackage = new adminPackageModel(input)
    let output = await newPackage.save()
    res.json({
      status: "success",
      data: output
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: "error",
      message: "somthing went wrong in add package by admin"
    })
  }
})

module.exports = router

// router.post("/add", async (req, res) => {
//   try {
//     let input = req.body
//     let newPackage = new admin_package_model(input);
//     await newPackage.save()
//     res.status(201).json({
//       status: "success",
//       data: newPackage
//     });
//   } catch (error) {
//     res.status(400).json({ message: err.message });
//   }
// });


// Get all package bookings
router.get("/view", async (req, res) => {
  try {
    const packages = await Admin_Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Get a single package booking
// router.get("/:id", getPackage, (req, res) => {
//   res.json(res.package);
// });

// // Update a package booking
// router.patch("/:id", getPackage, async (req, res) => {
//   try {
//     if (req.body.name != null) {
//       res.package.name = req.body.name;
//     }
//     if (req.body.email != null) {
//       res.package.email = req.body.email;
//     }
//     if (req.body.no_of_people != null) {
//       res.package.no_of_people = req.body.no_of_people;
//     }
//     if (req.body.date != null) {
//       res.package.date = req.body.date;
//     }
//     const updatedPackage = await res.package.save();
//     res.json(updatedPackage);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a package booking
// router.delete("/:id", getPackage, async (req, res) => {
//   try {
//     await res.package.remove();
//     res.json({ message: "Package booking deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// async function getPackage(req, res, next) {
//   let package;
//   try {
//     package = await Admin_Package.findById(req.params.id);
//     if (package == null) {
//       return res.status(404).json({ message: "Package booking not found" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

//   res.package = package;
//   next();
// }




//http://localhost:5000/api/AdminPackage/add_package