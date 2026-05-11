import { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { updateProfile } from "../../services/profileService";

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

    // EXISTING PROFILE
    if (profile) {
      setForm({
        ...profile,
        occupation: Array.isArray(profile.occupation)
          ? profile.occupation.join(", ")
          : profile.occupation || ""
      });
    }

  }, [profile]);

  const save = async () => {
    try {

      await updateProfile(form);

      await reload();

      setEditMode(false);

      alert("Profile saved successfully 🚀");

    } catch (err) {

      console.error(err);

      alert("Failed to save profile");
    }
  };

  // ================= LOADING =================
  if (profile === undefined) {
    return (
      <p className="p-4 sm:p-6">
        Loading...
      </p>
    );
  }

  // ================= NO PROFILE FOUND =================
  if (profile === null && !editMode) {
    return (
      <div className="p-4 sm:p-6">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-3">
            No Profile Found
          </h2>

          <p className="text-gray-600 mb-5">
            Create your first portfolio profile.
          </p>

          <button
            onClick={() => {
              setEditMode(true);

              setForm({
                name: "",
                occupation: "",
                email: "",
                mobile: "",
                github: "",
                linkedin: "",
                bio: "",
                about: "",
                goal: "",
              });
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg transition"
          >
            Create Profile
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <User size={20} />
          Personal Information
        </h1>

        <button
          onClick={() => setEditMode(!editMode)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          {editMode ? <Eye size={16} /> : <Pencil size={16} />}
          {editMode ? "View Mode" : "Edit Mode"}
        </button>

      </div>

      {/* ================= VIEW MODE ================= */}
      {!editMode && profile && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">

          {/* PROFILE HEADER */}
          <div className="flex flex-col items-center text-center mb-6">

            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center text-2xl font-bold text-green-700">
              {profile.name?.charAt(0)}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mt-3 break-words">
              {profile.name}
            </h2>

            {/* OCCUPATION */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {(Array.isArray(profile?.occupation)
                ? profile.occupation
                : profile?.occupation?.split(",") || []
              ).map((o, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium"
                >
                  {o.trim()}
                </span>
              ))}
            </div>

          </div>

          {/* CONTACT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

            <div className="space-y-3">

              <p className="flex items-center gap-2 break-all">
                <Mail size={16} />
                {profile.email}
              </p>

              <p className="flex items-center gap-2 break-all">
                <FaGithub size={16} />

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub Profile
                </a>
              </p>

            </div>

            <div className="space-y-3">

              <p className="flex items-center gap-2">
                <Phone size={16} />
                {profile.mobile}
              </p>

              <p className="flex items-center gap-2 break-all">
                <FaLinkedin size={16} />

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </p>

            </div>

          </div>

          {/* BIO */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              Short Bio
            </h3>

            <p className="text-gray-600 text-sm sm:text-base break-words">
              {profile.bio}
            </p>
          </div>

          {/* ABOUT */}
          <div className="mt-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              About Me
            </h3>

            <p className="text-gray-600 whitespace-pre-line text-sm sm:text-base break-words">
              {profile.about}
            </p>
          </div>

          {/* GOAL */}
          <div className="mt-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              My Goal
            </h3>

            <p className="text-gray-600 text-sm sm:text-base break-words">
              {profile.goal}
            </p>
          </div>

        </div>
      )}

      {/* ================= EDIT MODE ================= */}
      {editMode && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* NAME */}
            <input
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
              value={form.name || ""}
              placeholder="Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
            />

            {/* OCCUPATION */}
            <input
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
              value={form.occupation || ""}
              placeholder="Occupation (comma separated)"
              onChange={(e) =>
                setForm({
                  ...form,
                  occupation: e.target.value
                })
              }
            />

            {/* EMAIL */}
            <input
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
              value={form.email || ""}
              placeholder="Email"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />

            {/* MOBILE */}
            <input
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
              value={form.mobile || ""}
              placeholder="Mobile"
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value
                })
              }
            />

            {/* GITHUB */}
            <input
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
              value={form.github || ""}
              placeholder="GitHub URL"
              onChange={(e) =>
                setForm({
                  ...form,
                  github: e.target.value
                })
              }
            />

            {/* LINKEDIN */}
            <input
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
              value={form.linkedin || ""}
              placeholder="LinkedIn URL"
              onChange={(e) =>
                setForm({
                  ...form,
                  linkedin: e.target.value
                })
              }
            />

          </div>

          {/* BIO */}
          <textarea
            className="border p-3 w-full rounded-lg text-sm sm:text-base"
            rows="3"
            value={form.bio || ""}
            placeholder="Short Bio"
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value
              })
            }
          />

          {/* ABOUT */}
          <textarea
            className="border p-3 w-full rounded-lg text-sm sm:text-base"
            rows="4"
            value={form.about || ""}
            placeholder="About Me"
            onChange={(e) =>
              setForm({
                ...form,
                about: e.target.value
              })
            }
          />

          {/* GOAL */}
          <textarea
            className="border p-3 w-full rounded-lg text-sm sm:text-base"
            rows="3"
            value={form.goal || ""}
            placeholder="Goal"
            onChange={(e) =>
              setForm({
                ...form,
                goal: e.target.value
              })
            }
          />

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">

            <button
              onClick={save}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg transition"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="w-full sm:w-auto border px-5 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}