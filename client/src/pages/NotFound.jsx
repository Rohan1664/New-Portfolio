import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">

      <div className="text-center max-w-xl">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-500/10 flex items-center justify-center">
            <AlertTriangle
              size={40}
              className="text-blue-500 sm:w-12 sm:h-12"
            />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-blue-500 leading-none">
          404
        </h1>

        {/* TEXT */}
        <h2 className="mt-5 text-2xl sm:text-3xl font-bold">
          Page Not Found
        </h2>

        <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed px-2">
          Oops! The page you are looking for doesn’t exist,
          has been moved, or is temporarily unavailable.
        </p>

        {/* BUTTON */}
        <div className="mt-8">

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition px-6 py-3 rounded-xl font-medium text-sm sm:text-base shadow-lg"
          >
            <Home size={18} />
            Go Home
          </Link>

        </div>

      </div>

    </section>
  );
}