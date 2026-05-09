import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { getSkills } from "../services/skillService";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Mail,
  Phone,
  User,
  Target,
  Code2
} from "lucide-react";

export default function About() {
  const { profile } = useContext(ProfileContext);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then((res) => setSkills(res.data));
  }, []);

  if (!profile) {
    return (
      <p className="text-center text-white mt-20">
        Loading...
      </p>
    );
  }

  // ✅ Fix occupation safely
  const occupations = Array.isArray(profile.occupation)
    ? profile.occupation
    : typeof profile.occupation === "string"
      ? profile.occupation.split(",").map((o) => o.trim())
      : [];

  return (
    <section className="bg-gray-950 text-white min-h-screen py-16 sm:py-20 mt-4 mb-6 sm:mt-0 sm:mb-0">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">

        {/* ================= PROFILE HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">

          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0">
            {profile.name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold break-words">
              {profile.name}
            </h1>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              {occupations.map((o, i) => (
                <span
                  key={i}
                  className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs sm:text-sm"
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
            <h2 className="text-2xl font-bold">
              Who I Am
            </h2>
          </div>

          <div className="bg-gray-900 p-5 sm:p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* STORY */}
            <div>
              <h3 className="font-semibold mb-3 text-lg">
                My Story
              </h3>

              <p className="text-gray-400 leading-relaxed text-sm sm:text-base break-words whitespace-pre-line">
                {profile.about || profile.bio}
              </p>
            </div>

            {/* CONTACT */}
            <div className="space-y-4">

              <h3 className="font-semibold mb-2 text-lg">
                Contact Info
              </h3>

              <div className="flex items-start gap-2 text-gray-400 break-all text-sm sm:text-base">
                <Mail size={16} className="mt-1 shrink-0" />
                {profile.email}
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                <Phone size={16} />
                {profile.mobile}
              </div>

              {/* SOCIAL LINKS */}
              <div className="flex gap-5 pt-2">

                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                )}

                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <FaLinkedin className="text-2xl" />
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

            <h2 className="text-2xl font-bold">
              My Goal
            </h2>
          </div>

          <div className="bg-gray-900 p-5 sm:p-6 rounded-2xl text-gray-400 leading-relaxed text-sm sm:text-base break-words whitespace-pre-line">
            {profile.goal}
          </div>

        </div>

        {/* ================= SKILLS ================= */}
        <div className="space-y-4">

          <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
            <Code2 className="text-purple-500" />

            <h2 className="text-2xl font-bold">
              Technologies I Love
            </h2>
          </div>

          {skills.length === 0 ? (
            <div className="bg-gray-900 p-5 rounded-2xl text-gray-400 text-center">
              No skills found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-gray-900 p-5 rounded-2xl hover:scale-[1.02] transition"
                >

                  {/* SKILL NAME */}
                  <h3 className="font-semibold text-lg break-words">
                    {skill.name}
                  </h3>

                  {/* LEVEL */}
                  <div className="flex justify-between items-center mt-3 text-sm">
                    <span className="text-gray-400">
                      Skill Level
                    </span>

                    <span className="text-blue-400 font-medium">
                      {skill.level}%
                    </span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${skill.level}%`
                      }}
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