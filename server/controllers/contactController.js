import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const message = await Message.create(req.body);
  res.json(message);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
};