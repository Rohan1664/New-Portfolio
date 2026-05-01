import { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { updateProfile } from "../../services/profileService";

export default function ManageProfile() {
  const { profile, reload } = useContext(ProfileContext);

  const [form, setForm] = useState({});

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const save = async () => {
    await updateProfile(form);
    reload();
    alert("Profile updated 🚀");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6">

      {/* LEFT - FORM */}
      <div className="bg-white p-6 rounded-xl shadow space-y-3">

        <h1 className="text-xl font-bold mb-4">
          Edit Profile
        </h1>

        <input
          className="border p-2 w-full"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />

        <input
          className="border p-2 w-full"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />

        <textarea
          className="border p-2 w-full h-24"
          value={form.bio || ""}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="Bio"
        />

        <input
          className="border p-2 w-full"
          value={form.github || ""}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
          placeholder="GitHub"
        />

        <input
          className="border p-2 w-full"
          value={form.linkedin || ""}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          placeholder="LinkedIn"
        />

        <button
          onClick={save}
          className="bg-black text-white w-full py-2 rounded"
        >
          Save Profile
        </button>
      </div>

      {/* RIGHT - LIVE PREVIEW */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-bold mb-4">
          Live Preview 👁️
        </h2>

        <div className="space-y-3">

          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
            {form.name?.charAt(0) || "A"}
          </div>

          <h1 className="text-2xl font-bold">
            {form.name || "Your Name"}
          </h1>

          <p className="text-gray-300">
            {form.title || "Your Title"}
          </p>

          <p className="text-gray-400 text-sm">
            {form.bio || "Your bio will appear here..."}
          </p>

          <div className="pt-4 text-sm space-y-1">
            <p>🔗 GitHub: {form.github || "-"}</p>
            <p>🔗 LinkedIn: {form.linkedin || "-"}</p>
          </div>

        </div>
      </div>

    </div>
  );
}