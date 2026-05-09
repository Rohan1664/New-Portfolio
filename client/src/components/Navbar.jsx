import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";

import { ProfileContext } from "../context/ProfileContext";

import {
  Home,
  User,
  FolderKanban,
  Code2,
  Mail
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const { profile } = useContext(ProfileContext);

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: <Home size={20} />
    },
    {
      path: "/about",
      label: "About",
      icon: <User size={20} />
    },
    {
      path: "/projects",
      label: "Projects",
      icon: <FolderKanban size={20} />
    },
    {
      path: "/skills",
      label: "Skills",
      icon: <Code2 size={20} />
    },
    {
      path: "/contact",
      label: "Contact",
      icon: <Mail size={20} />
    }
  ];

  const desktopLinkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-gray-800 text-white font-semibold"
        : "text-gray-400 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="hidden md:block bg-gray-900/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-bold text-white tracking-wide"
          >
            {profile?.name || "My Portfolio"}
          </Link>

          {/* LINKS */}
          <div className="flex items-center gap-2">

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={desktopLinkStyle(item.path)}
              >
                {item.label}
              </Link>
            ))}

          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Hire Me
          </Link>

        </div>

      </nav>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 mb-16 sm:mt-20 left-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">

        <div className="flex items-center justify-center py-4 px-4">

          <Link
            to="/"
            className="text-lg font-bold text-white truncate"
          >
            {profile?.name || "My Portfolio"}
          </Link>

        </div>

      </div>

      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 z-50">

        <div className="grid grid-cols-5 h-16">

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center text-xs transition ${
                  isActive
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div
                  className={`mb-1 ${
                    isActive ? "scale-110" : ""
                  } transition`}
                >
                  {item.icon}
                </div>

                <span>{item.label}</span>
              </Link>
            );
          })}

        </div>

      </div>
    </>
  );
}