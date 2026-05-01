import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },

    mobile: { type: String },

    occupation: { type: String },

    bio: { type: String },

    goal: { type: String },

    github: { type: String },
    linkedin: { type: String },

    socialLinks: {
      type: {
        twitter: String,
        instagram: String,
        website: String,
      },
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);