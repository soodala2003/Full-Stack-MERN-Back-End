import express from "express";
import Technology from "../models/Technology.js";

const router = express.Router();

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

export default router;