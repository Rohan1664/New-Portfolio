import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">

      <h1 className="text-7xl font-bold text-blue-500">
        404
      </h1>

      <p className="text-gray-400 mt-3">
        Oops! Page not found
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Go Home
      </Link>

    </div>
  );
}