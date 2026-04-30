import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-950 text-white min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          My Projects 🚀
        </h1>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-400">
            Loading projects...
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-400">
            No projects found.
          </p>
        )}

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>

      </div>
    </section>
  );
}