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
  Link as LinkIcon,
  Image as ImageIcon
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
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
           <Folder size={22} />Manage Projects
        </h1>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          <input
            className="border p-2 rounded"
            placeholder="Project Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={(e) =>
              setForm({ ...form, features: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Tech Stack"
            value={form.techStack}
            onChange={(e) =>
              setForm({ ...form, techStack: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="GitHub URL"
            value={form.github}
            onChange={(e) =>
              setForm({ ...form, github: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Website URL"
            value={form.website}
            onChange={(e) =>
              setForm({ ...form, website: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={(e) =>
              setForm({ ...form, linkedin: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />

          {/* ACTION BUTTONS */}
          <button
            onClick={handleSubmit}
            className={`flex items-center justify-center gap-2 text-white rounded p-2 ${
              editingId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-black hover:bg-gray-800"
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
            className="flex items-center justify-center gap-2 bg-gray-400 text-white rounded p-2 hover:bg-gray-500"
          >
            <X size={16} /> Close
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="animate-spin" size={16} />
          Loading...
        </div>
      )}

      {/* PROJECTS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >

            {/* IMAGE */}
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}

            <h2 className="font-bold text-lg">{p.title}</h2>

            <p className="text-sm text-gray-600 mt-1">
              {p.description}
            </p>

            {/* TECH STACK */}
            {p.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {p.techStack.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* FEATURES */}
            {p.features?.length > 0 && (
              <ul className="text-xs text-gray-600 mt-2 list-disc pl-4">
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}

            {/* LINKS */}
            <div className="flex gap-4 mt-3 text-xs">

              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  className="flex items-center gap-1 text-blue-500"
                >
                  <FaGithub size={14} /> GitHub
                </a>
              )}

              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  className="flex items-center gap-1 text-green-500"
                >
                  <ExternalLink size={14} /> Live
                </a>
              )}

              {p.linkedin && (
                <a
                  href={p.linkedin}
                  target="_blank"
                  className="flex items-center gap-1 text-indigo-500"
                >
                  <FaLinkedin size={14} /> LinkedIn
                </a>
              )}

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() => handleEdit(p)}
                className="flex items-center gap-1 text-blue-500"
              >
                <Pencil size={14} /> Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="flex items-center gap-1 text-red-500"
              >
                <Trash2 size={14} /> Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}