import API from "./api";

// GET
export const getProjects = () =>
  API.get("/projects");

// CREATE
export const createProject = (data) =>
  API.post("/projects", data);

// UPDATE
export const updateProject = (id, data) =>
  API.put(`/projects/${id}`, data);

// DELETE
export const deleteProject = (id) =>
  API.delete(`/projects/${id}`);