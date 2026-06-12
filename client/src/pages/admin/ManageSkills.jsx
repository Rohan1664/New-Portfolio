import { useEffect, useState } from "react";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from "../../services/skillService";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Wrench,
  Check,
  Loader2
} from "lucide-react";

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    level: ""
  });

  const load = () => {
    setLoading(true);

    getSkills()
      .then((res) => setSkills(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      description: "",
      level: ""
    });

    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.name) {
      return alert("Skill name required");
    }

    const payload = {
      name: form.name,
      description: form.description,
      level: Number(form.level) || 50
    };

    if (editingId) {
      await updateSkill(editingId, payload);
    } else {
      await createSkill(payload);
    }

    setEditingId(null);
    setShowForm(false);

    setForm({
      name: "",
      description: "",
      level: ""
    });

    load();
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setShowForm(true);

    setForm({
      name: skill.name,
      description: skill.description,
      level: skill.level
    });
  };

  const handleDelete = async (id) => {
    await deleteSkill(id);
    load();
  };

  return (
    <div className="relative z-10 p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
          <Wrench size={22} />
          Skills
        </h1>

        <button
          onClick={openForm}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500 text-white px-4 py-3 rounded-lg hover:bg-cyan-600 transition"
        >
          <Plus size={16} />
          Add Skill
        </button>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 rounded-2xl shadow-xl mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg outline-none focus:border-cyan-400"
              placeholder="Skill Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
            />

            <input
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg outline-none focus:border-cyan-400"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
            />

            <input
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg outline-none focus:border-cyan-400"
              placeholder="Level (0-100)"
              type="number"
              value={form.level}
              onChange={(e) =>
                setForm({
                  ...form,
                  level: e.target.value
                })
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
              {editingId ? "Update" : "Add"}
            </button>

            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);

                setForm({
                  name: "",
                  description: "",
                  level: ""
                });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white rounded-lg px-5 py-3 hover:bg-white/20 transition"
            >
              <X size={16} />
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-300 mb-4">
          <Loader2 className="animate-spin" size={16} />
          Loading...
        </div>
      )}

      {/* SKILLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {skills.map((s) => (
          <div
            key={s._id}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl shadow-xl hover:border-cyan-400/40 transition"
          >

            {/* NAME */}
            <h2 className="font-bold text-lg text-white break-words">
              {s.name}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-200 mt-2 break-words">
              {s.description}
            </p>

            {/* PROGRESS BAR */}
            <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-cyan-500 h-2 rounded-full transition-all"
                style={{ width: `${s.level}%` }}
              />
            </div>

            {/* LEVEL */}
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-300">
                Skill Level
              </p>

              <p className="text-xs font-semibold text-cyan-400">
                {s.level}%
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">

              <button
                onClick={() => handleEdit(s)}
                className="flex items-center justify-center gap-2 text-cyan-400 border border-cyan-400/30 rounded-lg px-4 py-2 hover:bg-cyan-500/10 transition"
              >
                <Pencil size={14} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(s._id)}
                className="flex items-center justify-center gap-2 text-red-400 border border-red-400/30 rounded-lg px-4 py-2 hover:bg-red-500/10 transition"
              >
                <Trash2 size={14} />
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}