import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManageProfile() {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/profile")
      .then(res => setProfile(res.data || {}))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    try {
      await API.put("/profile", profile);
      alert("Profile updated successfully 🚀");
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-3xl">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">
        ⚙️ Manage Profile
      </h1>

      {/* FORM CARD */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">

        {/* Name */}
        <div>
          <label className="text-sm text-gray-500">Name</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={profile.name || ""}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-gray-500">Phone</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={profile.phone || ""}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm text-gray-500">Location</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={profile.location || ""}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm text-gray-500">Bio</label>
          <textarea
            className="w-full border p-2 rounded mt-1 h-28"
            value={profile.bio || ""}
            onChange={(e) =>
              setProfile({ ...profile, bio: e.target.value })
            }
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={save}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}