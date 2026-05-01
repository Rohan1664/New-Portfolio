import Profile from "../models/Profile.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE / CREATE PROFILE (SINGLE DOCUMENT SYSTEM)
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        req.body,
        { new: true }
      );
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
};