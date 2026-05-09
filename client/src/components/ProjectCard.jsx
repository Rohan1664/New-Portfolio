import {
  ExternalLink,
  
  GlobeIcon,
  Layers3
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 h-full flex flex-col">

      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden">

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-52 sm:h-56 object-cover hover:scale-105 transition duration-500"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-52 sm:h-56 bg-gray-800 flex flex-col items-center justify-center text-gray-400">

            <Layers3
              size={34}
              className="mb-2"
            />

            <span className="text-sm">
              No Image Available
            </span>

          </div>
        )}

      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5 flex flex-col flex-1">

        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white break-words">
          {project.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed line-clamp-4 flex-1">
          {project.description}
        </p>

        {/* ================= TECH STACK ================= */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">

            {project.techStack.slice(0, 6).map((tech, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700"
              >
                {tech}
              </span>
            ))}

          </div>
        )}

        {/* ================= LINKS ================= */}
        <div className="flex flex-wrap gap-3 mt-6">

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-xl transition active:scale-[0.98]"
            >
              <FaGithub size={16} />
              GitHub
            </a>
          )}

          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-xl transition active:scale-[0.98]"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}

        </div>

      </div>

    </div>
  );
}