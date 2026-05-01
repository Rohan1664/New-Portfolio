import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

// Icons (Lucide)
import {
  Mail,
  Phone
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { profile } = useContext(ProfileContext);

  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            {profile?.name || "Your Name"}
          </h2>

          <p className="text-sm text-gray-400">
            {profile?.bio || "MERN Stack Developer building modern apps."}
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>

          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/about" className="hover:text-white transition">About</Link>
            <Link to="/projects" className="hover:text-white transition">Projects</Link>
            <Link to="/skills" className="hover:text-white transition">Skills</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>

        {/* CONTACT / SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>

          <div className="flex flex-col gap-3 text-sm">

            {profile?.github && (
              <a
                href={profile.github}
                target="_blank"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <FaGithub size={18} /> GitHub
              </a>
            )}

            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <FaLinkedin size={18} /> LinkedIn
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail size={18} /> {profile.email}
              </a>
            )}

            {profile?.mobile && (
              <p className="flex items-center gap-2">
                <Phone size={18} /> {profile.mobile}
              </p>
            )}

          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} {profile?.name || "Portfolio"}. All rights reserved.
      </div>
    </footer>
  );
}