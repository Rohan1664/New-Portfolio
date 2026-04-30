export default function ProjectCard({ project }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300">

      {/* IMAGE */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-44 object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div className="w-full h-44 bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
          No Image
        </div>
      )}

      <div className="p-4">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-white">
          {project.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm mt-2 line-clamp-3">
          {project.description}
        </p>

        {/* TECH STACK */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.techStack.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* LINKS */}
        <div className="flex gap-4 mt-4 text-sm">

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              GitHub
            </a>
          )}

          {project.website && (
            <a
              href={project.website}
              target="_blank"
              className="text-green-400 hover:underline"
            >
              Live
            </a>
          )}

        </div>

      </div>
    </div>
  );
}