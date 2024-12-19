import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

const router = express.Router();

// Get all users entries
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true,  data: users });
  } catch (error) {
    console.log("Error in fetching users: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
  
// Get a single user 
router.get("/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true,  data: user });
  } catch (error) {
    console.log("Error in fetching users: ", error.message);
    //res.status(500).json({ success: false, message: "Server Error" });
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// Add a new single user to the collection
router.post("/", async (req, res) => {
  const user = req.body;
  
  if (!user.name || !user.email) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }
  
  const newUser = new User(user);
  
  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error in creating user: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
  
// Update a single user entry
router.put("/:id", async(req, res) => {
  const {id} = req.params;
  const user = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }
  
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {new:true});
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
})
  
// Delete a single user entry
router.delete("/:id", async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true,  message: "User deleted"});
  } catch (error) {
    console.log("Error in deleting user: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;