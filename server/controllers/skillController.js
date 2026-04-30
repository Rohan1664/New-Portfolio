import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
};

export const createSkill = async (req, res) => {
  const skill = await Skill.create(req.body);
  res.json(skill);
};

export const updateSkill = async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(skill);
};

export const deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill deleted" });
};