import { useEffect, useState } from "react";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from "../../services/skillService";

// ✅ Icons
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

  // OPEN FORM
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
    <div className="p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wrench size={22} />
          Skills
        </h1>

        <button
          onClick={openForm}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition"
        >
          <Plus size={16} />
          Add Skill
        </button>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              className="border p-3 rounded-lg w-full"
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
              className="border p-3 rounded-lg w-full"
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
              className="border p-3 rounded-lg w-full"
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white rounded-lg px-5 py-3 hover:bg-gray-800 transition"
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-400 text-white rounded-lg px-5 py-3 hover:bg-gray-500 transition"
            >
              <X size={16} />
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Loader2 className="animate-spin" size={16} />
          Loading...
        </div>
      )}

      {/* SKILLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {skills.map((s) => (
          <div
            key={s._id}
            className="bg-white p-4 sm:p-5 rounded-2xl shadow hover:shadow-lg transition"
          >

            {/* NAME */}
            <h2 className="font-bold text-lg break-words">
              {s.name}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-500 mt-2 break-words">
              {s.description}
            </p>

            {/* PROGRESS BAR */}
            <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${s.level}%` }}
              />
            </div>

            {/* LEVEL */}
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                Skill Level
              </p>

              <p className="text-xs font-semibold text-blue-600">
                {s.level}%
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">

              <button
                onClick={() => handleEdit(s)}
                className="flex items-center justify-center gap-2 text-blue-500 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
              >
                <Pencil size={14} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(s._id)}
                className="flex items-center justify-center gap-2 text-red-500 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50 transition"
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