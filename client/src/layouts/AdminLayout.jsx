import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItem = (path) =>
    `block px-4 py-2 rounded transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">

        <h2 className="text-2xl font-bold mb-8">
          Admin Panel ⚡
        </h2>

        <nav className="flex flex-col gap-2">

          <Link to="/admin/dashboard" className={navItem("/admin/dashboard")}>
            Dashboard
          </Link>

          <Link to="/admin/projects" className={navItem("/admin/projects")}>
            Projects
          </Link>

          <Link to="/admin/skills" className={navItem("/admin/skills")}>
            Skills
          </Link>

          <Link to="/admin/profile" className={navItem("/admin/profile")}>
            Profile
          </Link>

          <Link to="/admin/messages" className={navItem("/admin/messages")}>
            Messages
          </Link>
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>

    </div>
  );
}