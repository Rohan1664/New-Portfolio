import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { getSkills } from "../services/skillService";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Phone, User, Target, Code2 } from "lucide-react";

export default function About() {
  const { profile } = useContext(ProfileContext);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then(res => setSkills(res.data));
  }, []);

  if (!profile) {
    return <p className="text-center text-white mt-20">Loading...</p>;
  }

  // ✅ Fix occupation safely
  const occupations = Array.isArray(profile.occupation)
    ? profile.occupation
    : typeof profile.occupation === "string"
    ? profile.occupation.split(",").map((o) => o.trim())
    : [];

  return (
    <section className="bg-gray-950 text-white min-h-screen py-16">

      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* ================= PROFILE HEADER ================= */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
            {profile.name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {profile.name}
            </h1>

            <div className="flex flex-wrap gap-2 mt-1">
              {occupations.map((o, i) => (
                <span
                  key={i}
                  className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= WHO I AM ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
            <User className="text-blue-500" />
            <h2 className="text-2xl font-bold">Who I Am</h2>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl grid md:grid-cols-2 gap-6">

            <div>
              <h3 className="font-semibold mb-2">My Story</h3>
              <p className="text-gray-400">
                {profile.about || profile.bio}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold mb-2">Contact Info</h3>

              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} /> {profile.email}
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={16} /> {profile.mobile}
              </div>

              <div className="flex gap-4 mt-2">
                {profile.github && (
                  <a href={profile.github} target="_blank">
                    <FaGithub className="text-xl hover:text-white" />
                  </a>
                )}

                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank">
                    <FaLinkedin className="text-xl hover:text-blue-400" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ================= GOAL ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
            <Target className="text-green-500" />
            <h2 className="text-2xl font-bold">My Goal</h2>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl text-gray-400">
            {profile.goal}
          </div>
        </div>

        {/* ================= SKILLS FROM DB ================= */}
        <div className="space-y-4">

          <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
            <Code2 className="text-purple-500" />
            <h2 className="text-2xl font-bold">
              Technologies I Love
            </h2>
          </div>

          {skills.length === 0 ? (
            <p className="text-gray-400">No skills found</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-gray-900 p-5 rounded-xl hover:scale-105 transition"
                >
                  <h3 className="font-semibold text-lg">
                    {skill.name}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Level: {skill.level}%
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-800 h-2 rounded mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}