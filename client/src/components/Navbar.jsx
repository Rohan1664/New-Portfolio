import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `relative px-3 py-2 transition ${
      location.pathname === path
        ? "text-white"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-white tracking-wide">
          Aditya.dev
        </h1>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={linkStyle("/")}>Home</Link>
          <Link to="/about" className={linkStyle("/about")}>About</Link>
          <Link to="/projects" className={linkStyle("/projects")}>Projects</Link>
          <Link to="/skills" className={linkStyle("/skills")}>Skills</Link>
          <Link to="/contact" className={linkStyle("/contact")}>Contact</Link>
        </div>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="hidden md:block bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Hire Me
        </Link>
      </div>
    </nav>
  );
}