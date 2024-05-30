const express = require("express");
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

// POST /api/login
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.json({
        status: "fail",
        message: "Invalid user",
      });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({
        status: "fail",
        message: "Password does not match",
      });
    }

    if (username === "admin@gmail.com" && password === "admin") {
      // Redirect the admin to the admin dashboard
      return res.json({
        status: "success",
        message: "Admin login successful",
        isAdmin: true,
      });
    }

    // If both username and password are correct for a regular user, return success message
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email is already taken
    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/admin/signup
router.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await userModel.findOne({ username: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const newAdmin = new userModel({ username, password: hashedPassword });
    await newAdmin.save();

    return res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error during admin signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/users
router.get("/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await userModel.find({}, { password: 0 }); // Exclude password field from the response
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
