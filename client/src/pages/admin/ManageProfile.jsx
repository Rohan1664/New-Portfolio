import { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { updateProfile } from "../../services/profileService";

// ✅ Lucide Icons
import {
  User,
  Mail,
  Phone,
  Pencil,
  Eye
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ManageProfile() {
  const { profile, reload } = useContext(ProfileContext);

  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        ...profile,
        occupation: Array.isArray(profile.occupation)
          ? profile.occupation
          : profile.occupation
          ? [profile.occupation]
          : []
      });
    }
  }, [profile]);

  const save = async () => {
    await updateProfile(form);
    reload();
    setEditMode(false);
    alert("Profile updated 🚀");
  };

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User size={20} /> Personal Information
        </h1>

        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          {editMode ? <Eye size={16} /> : <Pencil size={16} />}
          {editMode ? "View Mode" : "Edit Mode"}
        </button>
      </div>

      {/* ================= VIEW MODE ================= */}
      {!editMode && (
        <div className="bg-white p-6 rounded-xl shadow">

          {/* PROFILE HEADER */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center text-2xl font-bold">
              {profile.name?.charAt(0)}
            </div>

            <h2 className="text-xl font-bold mt-3">{profile.name}</h2>

            {/* OCCUPATION */}
            <div className="flex gap-2 mt-2 flex-wrap justify-center">
              {Array.isArray(profile.occupation) &&
                profile.occupation.map((o, i) => (
                  <span
                    key={i}
                    className="bg-green-100 px-2 py-1 rounded text-sm"
                  >
                    {o}
                  </span>
                ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="grid md:grid-cols-2 gap-6 text-sm">

            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail size={16} /> {profile.email}
              </p>

              <p className="flex items-center gap-2">
                <FaGithub size={16} />
                <a href={profile.github} className="text-blue-500">
                  GitHub Profile
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone size={16} /> {profile.mobile}
              </p>

              <p className="flex items-center gap-2">
                <FaLinkedin size={16} />
                <a href={profile.linkedin} className="text-blue-500">
                  LinkedIn Profile
                </a>
              </p>
            </div>

          </div>

          {/* BIO */}
          <div className="mt-6">
            <h3 className="font-semibold">Short Bio</h3>
            <p className="text-gray-600">{profile.bio}</p>
          </div>

          {/* ABOUT */}
          <div className="mt-4">
            <h3 className="font-semibold">About Me</h3>
            <p className="text-gray-600">{profile.about}</p>
          </div>

          {/* GOAL */}
          <div className="mt-4">
            <h3 className="font-semibold">My Goal</h3>
            <p className="text-gray-600">{profile.goal}</p>
          </div>

        </div>
      )}

      {/* ================= EDIT MODE ================= */}
      {editMode && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="border p-2 rounded"
              value={form.name || ""}
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              value={form.occupation?.join(", ") || ""}
              placeholder="Occupation (comma separated)"
              onChange={(e) =>
                setForm({
                  ...form,
                  occupation: e.target.value
                    .split(",")
                    .map((i) => i.trim())
                })
              }
            />

            <input
              className="border p-2 rounded"
              value={form.email || ""}
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              value={form.mobile || ""}
              placeholder="Mobile"
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              value={form.github || ""}
              placeholder="GitHub"
              onChange={(e) => setForm({ ...form, github: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              value={form.linkedin || ""}
              placeholder="LinkedIn"
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            />

          </div>

          {/* BIO */}
          <textarea
            className="border p-2 w-full rounded"
            rows="3"
            value={form.bio || ""}
            placeholder="Short Bio"
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />

          {/* ABOUT */}
          <textarea
            className="border p-2 w-full rounded"
            rows="4"
            value={form.about || ""}
            placeholder="About Me"
            onChange={(e) => setForm({ ...form, about: e.target.value })}
          />

          {/* GOAL */}
          <textarea
            className="border p-2 w-full rounded"
            rows="3"
            value={form.goal || ""}
            placeholder="Goal"
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
          />

          <div className="flex gap-3">
            <button
              onClick={save}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>

        </div>
      )}

    </div>
  );
}