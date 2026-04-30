import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
};

export const updateProfile = async (req, res) => {
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
};