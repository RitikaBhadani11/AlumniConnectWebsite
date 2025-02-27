const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  branch: String,
  hobbies: String,
  skills: String,
  year: String,
  description: String,
  profilePic: String, // Store image as base64 or URL
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
