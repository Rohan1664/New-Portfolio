import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

import {
  LayoutDashboard,
  Folder,
  Wrench,
  User,
  Mail,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItem = (path) =>
    `flex flex-col items-center justify-center gap-1 text-xs transition ${
      location.pathname === path
        ? "text-blue-600"
        : "text-gray-500 hover:text-blue-500"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:flex">

          <aside className="w-64 min-h-screen bg-gray-900 text-white p-5 flex flex-col">

            <h2 className="text-2xl font-bold mb-8">
              Admin Panel ⚡
            </h2>

            <nav className="flex flex-col gap-2">

              <Link
                to="/admin/dashboard"
                className={`px-4 py-3 rounded-lg transition ${
                  location.pathname === "/admin/dashboard"
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/admin/projects"
                className={`px-4 py-3 rounded-lg transition ${
                  location.pathname === "/admin/projects"
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                Projects
              </Link>

              <Link
                to="/admin/skills"
                className={`px-4 py-3 rounded-lg transition ${
                  location.pathname === "/admin/skills"
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                Skills
              </Link>

              <Link
                to="/admin/profile"
                className={`px-4 py-3 rounded-lg transition ${
                  location.pathname === "/admin/profile"
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                Profile
              </Link>

              <Link
                to="/admin/messages"
                className={`px-4 py-3 rounded-lg transition ${
                  location.pathname === "/admin/messages"
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                Messages
              </Link>
            </nav>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="mt-auto bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
            >
              Logout
            </button>

          </aside>

          {/* DESKTOP CONTENT */}
          <main className="flex-1 p-6">
            {children}
          </main>

        </div>

        {/* MOBILE CONTENT */}
        <main className="lg:hidden p-4 pb-24 mt-14 mb-16">
          {children}
        </main>

        {/* MOBILE BOTTOM NAV */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">

          <div className="grid grid-cols-6 h-16">

            <Link
              to="/admin/dashboard"
              className={navItem("/admin/dashboard")}
            >
              <LayoutDashboard size={22} />
              Dashboard
            </Link>

            <Link
              to="/admin/projects"
              className={navItem("/admin/projects")}
            >
              <Folder size={22} />
              Projects
            </Link>

            <Link
              to="/admin/skills"
              className={navItem("/admin/skills")}
            >
              <Wrench size={22} />
              Skills
            </Link>

            <Link
              to="/admin/profile"
              className={navItem("/admin/profile")}
            >
              <User size={22} />
              Profile
            </Link>

            <Link
              to="/admin/messages"
              className={navItem("/admin/messages")}
            >
              <Mail size={22} />
              Messages
            </Link>

            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center gap-1 text-xs text-red-500"
            >
              <LogOut size={22} />
              Logout
            </button>

          </div>

        </div>

      </div>
    </>
  );
}