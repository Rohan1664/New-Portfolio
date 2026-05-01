import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

export default function About() {
  const { profile } = useContext(ProfileContext);

  const skills = profile?.skills || [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "JavaScript"
  ];

  return (
    <section className="bg-gray-950 text-white min-h-screen py-16">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="flex justify-center">
          <div className="w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
            {profile?.name?.charAt(0) || "A"}
          </div>
        </div>

        {/* RIGHT */}
        <div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About Me
          </h1>

          <p className="text-gray-400 mb-4">
            {profile?.bio ||
              "I'm a passionate MERN Stack Developer."}
          </p>

          <p className="text-gray-400 mb-6">
            {profile?.goal ||
              "I build modern, scalable web applications using MERN stack."}
          </p>

          {/* SKILLS */}
          <div className="flex flex-wrap gap-3 mb-6">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* STATS (OPTIONAL STATIC OR FROM DB LATER) */}
          <div className="flex gap-6">

            <div>
              <h2 className="text-2xl font-bold text-blue-500">
                10+
              </h2>
              <p className="text-gray-400 text-sm">Projects</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-500">
                1+
              </h2>
              <p className="text-gray-400 text-sm">Years Learning</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-500">
                100%
              </h2>
              <p className="text-gray-400 text-sm">Dedication</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}