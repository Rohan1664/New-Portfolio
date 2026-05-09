import { Link } from "react-router-dom";
import { useContext } from "react";

import { ProfileContext } from "../context/ProfileContext";

// Icons
import {
  Mail,
  Phone,
  ArrowUpRight
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin
} from "react-icons/fa";

export default function Footer() {
  const { profile } = useContext(ProfileContext);

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* ================= BRAND ================= */}
          <div className="space-y-4 text-center sm:text-left">

            <h2 className="text-2xl sm:text-3xl font-bold text-white break-words">
              {profile?.name || "Your Name"}
            </h2>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {profile?.bio ||
                "MERN Stack Developer building modern, scalable and responsive web applications."}
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">

              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
                >
                  <FaGithub size={18} />
                </a>
              )}

              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
                >
                  <FaLinkedin size={18} />
                </a>
              )}

            </div>

          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="text-center sm:text-left">

            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm sm:text-base">

              <Link
                to="/"
                className="hover:text-white transition flex items-center justify-center sm:justify-start gap-2"
              >
                Home <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/about"
                className="hover:text-white transition flex items-center justify-center sm:justify-start gap-2"
              >
                About <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/projects"
                className="hover:text-white transition flex items-center justify-center sm:justify-start gap-2"
              >
                Projects <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/skills"
                className="hover:text-white transition flex items-center justify-center sm:justify-start gap-2"
              >
                Skills <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/contact"
                className="hover:text-white transition flex items-center justify-center sm:justify-start gap-2"
              >
                Contact <ArrowUpRight size={14} />
              </Link>

            </div>

          </div>

          {/* ================= CONTACT ================= */}
          <div className="text-center sm:text-left">

            <h3 className="text-white text-lg font-semibold mb-4">
              Contact
            </h3>

            <div className="flex flex-col gap-4 text-sm sm:text-base">

              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition break-all"
                >
                  <Mail size={18} className="text-blue-400 shrink-0" />
                  <span>{profile.email}</span>
                </a>
              )}

              {profile?.mobile && (
                <a
                  href={`tel:${profile.mobile}`}
                  className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition"
                >
                  <Phone size={18} className="text-green-400 shrink-0" />
                  <span>{profile.mobile}</span>
                </a>
              )}

            </div>

          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs sm:text-sm text-gray-500 leading-relaxed">

          © {new Date().getFullYear()}{" "}
          <span className="text-gray-300 font-medium">
            {profile?.name || "Portfolio"}
          </span>
          . All rights reserved.

        </div>

      </div>

    </footer>
  );
}