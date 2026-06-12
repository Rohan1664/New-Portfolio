import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from "../../services/projectService";

// ✅ Icons
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Folder,
  Check,
  Loader2,
  ExternalLink,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    features: "",
    techStack: "",
    github: "",
    website: "",
    linkedin: "",
    image: ""
  });

  const load = () => {
    setLoading(true);

    getProjects()
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const toArray = (str) =>
    str
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const openCreateForm = () => {
    setEditingId(null);
    resetForm();
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      return alert("Title and Description required");
    }

    const payload = {
      title: form.title,
      description: form.description,
      features: toArray(form.features),
      techStack: toArray(form.techStack),
      github: form.github,
      website: form.website,
      linkedin: form.linkedin,
      image: form.image
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }

      setEditingId(null);
      setShowForm(false);
      resetForm();
      load();

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      features: "",
      techStack: "",
      github: "",
      website: "",
      linkedin: "",
      image: ""
    });
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setShowForm(true);

    setForm({
      title: project.title || "",
      description: project.description || "",
      features: (project.features || []).join(", "),
      techStack: (project.techStack || []).join(", "),
      github: project.github || "",
      website: project.website || "",
      linkedin: project.linkedin || "",
      image: project.image || ""
    });
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    load();
  };

  return (
    <div className="p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
          <Folder size={22} className="text-cyan-400" />
          Manage Projects
        </h1>

        <button
          onClick={openCreateForm}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg transition"
        >
          <Plus size={16} />
          Add Project
        </button>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-4 sm:p-6 rounded-2xl mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none p-3 rounded-lg w-full transition"
              placeholder="Project Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none p-3 rounded-lg w-full transition"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none p-3 rounded-lg w-full transition"
              placeholder="Features (comma separated)"
              value={form.features}
              onChange={(e) =>
                setForm({ ...form, features: e.target.value })
              }
            />

            <input
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none p-3 rounded-lg w-full transition"
              placeholder="Tech Stack"
              value={form.techStack}
              onChange={(e) =>
                setForm({ ...form, techStack: e.target.value })
              }
            />

            <input
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none p-3 rounded-lg w-full transition"
              placeholder="GitHub URL"
              value={form.github}
              onChange={(e) =>
                setForm({ ...form, github: e.target.value })
              }
            />

            <input
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none p-3 rounded-lg w-full transition"
              placeholder="Website URL"
              value={form.website}
              onChange={(e) =>
                setForm({ ...form, website: e.target.value })
              }
            />

            <input
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none p-3 rounded-lg w-full transition"
              placeholder="LinkedIn URL"
              value={form.linkedin}
              onChange={(e) =>
                setForm({ ...form, linkedin: e.target.value })
              }
            />

            <input
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none p-3 rounded-lg w-full transition"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
            />

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">

            <button
              onClick={handleSubmit}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white rounded-lg px-5 py-3 transition ${
                editingId
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-cyan-500 hover:bg-cyan-600"
              }`}
            >
              <Check size={16} />
              {editingId ? "Update" : "Create"}
            </button>

            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                resetForm();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-lg px-5 py-3 transition"
            >
              <X size={16} />
              Close
            </button>

          </div>

        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-300 mb-4">
          <Loader2 className="animate-spin text-cyan-400" size={16} />
          Loading...
        </div>
      )}

      {/* PROJECTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-cyan-400/40 shadow-xl p-4 rounded-2xl transition flex flex-col"
          >

            {/* IMAGE */}
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

            {/* TITLE */}
            <h2 className="font-bold text-lg break-words text-white">
              {p.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-300 mt-2 break-words">
              {p.description}
            </p>

            {/* TECH STACK */}
            {p.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {p.techStack.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 px-2 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* FEATURES */}
            {p.features?.length > 0 && (
              <ul className="text-xs text-gray-300 mt-3 list-disc pl-5 space-y-1">
                {p.features.map((f, i) => (
                  <li key={i} className="break-words">
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* LINKS */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm">

              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
                >
                  <FaGithub size={15} />
                  GitHub
                </a>
              )}

              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-green-400 hover:text-green-300 transition"
                >
                  <ExternalLink size={15} />
                  Live
                </a>
              )}

              {p.linkedin && (
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
                >
                  <FaLinkedin size={15} />
                  LinkedIn
                </a>
              )}

            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">

              <button
                onClick={() => handleEdit(p)}
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-lg px-4 py-2 transition"
              >
                <Pencil size={15} className="text-cyan-400" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="flex items-center justify-center gap-2 border border-red-400/30 text-red-400 hover:bg-red-500/10 rounded-lg px-4 py-2 transition"
              >
                <Trash2 size={15} />
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}