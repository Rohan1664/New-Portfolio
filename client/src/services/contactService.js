import API from "./api";

export const sendMessage = (data) =>
  API.post("/contact", data);

export const getMessages = () =>
  API.get("/contact");