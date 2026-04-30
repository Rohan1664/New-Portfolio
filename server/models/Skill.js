import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    default: ""
  },

  level: {
    type: Number,
    default: 50
  }
});

export default mongoose.model("Skill", skillSchema);