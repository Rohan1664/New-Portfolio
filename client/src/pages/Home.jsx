import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

export default function Home() {
  const { profile } = useContext(ProfileContext);

  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-screen bg-gray-950 text-white flex items-center pt-24 sm:pt-28 pb-14 ">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left order-2 md:order-1">

            <p className="text-blue-400 font-medium mb-3 text-sm sm:text-base tracking-wide">
              WELCOME TO MY PORTFOLIO
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight break-words">
              Hi, I'm{" "}
              <span className="text-blue-500">
                {profile?.name || "My Portfolio"}
              </span>{" "}
              👋
            </h1>

            <h2 className="text-lg sm:text-xl lg:text-2xl mt-5 text-gray-300 font-medium">
              {profile?.title || "MERN Stack Developer"}
            </h2>

            <p className="mt-6 text-gray-400 leading-relaxed text-sm sm:text-base lg:text-lg max-w-2xl mx-auto md:mx-0">
              {profile?.bio ||
                "I build modern, scalable and high-performance web applications using React, Node.js and MongoDB."}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              <Link
                to="/projects"
                className="bg-blue-500 px-6 py-3.5 rounded-xl font-medium hover:bg-blue-600 transition text-center active:scale-[0.98]"
              >
                View Projects
              </Link>

              <Link
                to="/contact"
                className="border border-gray-700 px-6 py-3.5 rounded-xl hover:bg-gray-800 transition text-center active:scale-[0.98]"
              >
                Contact Me
              </Link>

            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div className="flex justify-center order-1 md:order-2">

            <div className="relative">

              {/* GLOW EFFECT */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

              {/* PROFILE IMAGE */}
              <img
                src="../Rohanfasate.avif"
                alt="Profile"
                className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-gray-700 shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>
    </>
  );
}