import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

export default function Home() {
  const { profile } = useContext(ProfileContext); // ✅ INSIDE COMPONENT

  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-screen bg-gray-950 text-white flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Hi, I'm {profile?.name || "My Portfolio"} 👋
            </h1>

            <h2 className="text-xl mt-4 text-gray-300">
              {profile?.title || "MERN Stack Developer"}
            </h2>

            <p className="mt-6 text-gray-400">
              {profile?.bio ||
                "I build modern, scalable and high-performance web applications using React, Node.js and MongoDB."}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">
              <Link
                to="/projects"
                className="bg-blue-500 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
              >
                View Projects
              </Link>

              <Link
                to="/contact"
                className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
              {profile?.name?.charAt(0) || "A"}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}