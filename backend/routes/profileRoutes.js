const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get user profile by email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put("/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body, // Updating fields dynamically
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
