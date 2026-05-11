import API from "./api";

export const getProfile = () =>
  API.get("/profile");

export const updateProfile = (data) =>
  API.put("/profile", data);