import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  title: String,
  socialLinks: Object
});

export default mongoose.model("Profile", profileSchema);