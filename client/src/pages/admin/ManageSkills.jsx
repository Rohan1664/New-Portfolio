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
    setForm({ name: "", description: "", level: "" });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.name) return alert("Skill name required");

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
    setForm({ name: "", description: "", level: "" });
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
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
         <Wrench size={22} /> Skills
        </h1>

        <button
          onClick={openForm}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4">

          <input
            className="border p-2 rounded"
            placeholder="Skill Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
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
            placeholder="Level (0-100)"
            type="number"
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: e.target.value })
            }
          />

          {/* ACTION BUTTONS */}
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 bg-black text-white rounded p-2 hover:bg-gray-800"
          >
            <Check size={16} />
            {editingId ? "Update" : "Add"}
          </button>

          <button
            onClick={() => {
              setShowForm(false);
              setEditingId(null);
              setForm({ name: "", description: "", level: "" });
            }}
            className="flex items-center justify-center gap-2 bg-gray-400 text-white rounded p-2 hover:bg-gray-500"
          >
            <X size={16} /> Cancel
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

      {/* SKILLS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {skills.map((s) => (
          <div
            key={s._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >

            {/* NAME */}
            <h2 className="font-bold text-lg">
              {s.name}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-500 mt-1">
              {s.description}
            </p>

            {/* PROGRESS BAR */}
            <div className="w-full bg-gray-200 h-2 rounded mt-3">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${s.level}%` }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {s.level}%
            </p>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-4 text-sm">

              <button
                onClick={() => handleEdit(s)}
                className="flex items-center gap-1 text-blue-500 hover:underline"
              >
                <Pencil size={14} /> Edit
              </button>

              <button
                onClick={() => handleDelete(s._id)}
                className="flex items-center gap-1 text-red-500 hover:underline"
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