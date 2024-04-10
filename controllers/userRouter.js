const express=require("express")
const userModel=require("../models/User")
const bcrypt=require("bcrypt")
const router=express.Router()

// POST /api/login
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ username });
    if (!user) {
      return(res.json({
        status:"fail",
        message:"invalid user"
      }))
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      
      return(res.json({
        status:"fail",
        message:"password not match"
      }))
    }

    // If both username and password are correct, return success message
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



module.exports=router