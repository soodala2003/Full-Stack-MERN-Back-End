import express from "express";
import mongoose from "mongoose";
import Technology from "../models/Technology.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const technologies = await Technology.find({});
    res.status(200).json({ success: true,  data: technologies });
  } catch (error) {
    console.log("Error in fetching technologies: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get a single technology source 
router.get("/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const technology = await Technology.findById(id);

    if (!technology) {
      return res.status(404).json({ success: false, message: "Technology not found" });
    }

    res.status(200).json({ success: true,  data: technology });
  } catch (error) {
    console.log("Error in fetching technologies: ", error.message);
    res.status(404).json({ success: false, message: "Technology not found" });
  }
});

// Add a new single technology entry to the collection
router.post("/", async (req, res) => {
  const technology = req.body;
  
  if (!technology.author || !technology.title || !technology.description || !technology.url) {
    return res.status(400).json({ success: false, message: "Please provide fields of Author, Title, Description, and URL." });
  }
  
  const newTechnology = new Technology(technology);
  
  try {
    await newTechnology.save();
    res.status(201).json({ success: true, data: newTechnology });
  } catch (error) {
    console.error("Error in creating technology: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Update a single technology entry
router.put("/:id", async(req, res) => {
  const {id} = req.params;
  const technology = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Technology Id" });
  }
  
  try {
    const updatedTechnology = await Technology.findByIdAndUpdate(id, technology, {new:true});
    res.status(200).json({ success: true, data: updatedTechnology });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
})

// Delete a single technology entry
router.delete("/:id", async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Technology Id" });
  }

  try {
    await Technology.findByIdAndDelete(id);
    res.status(200).json({ success: true,  message: "Technology deleted"});
  } catch (error) {
    console.log("Error in deleting technology: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;