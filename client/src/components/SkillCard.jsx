import { Code2 } from "lucide-react";

export default function SkillCard({ skill }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 h-full">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1 min-w-0">

          <h2 className="text-lg sm:text-xl font-semibold text-white break-words">
            {skill.name}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed break-words">
            {skill.description || "No description available"}
          </p>

        </div>

        {/* ICON */}
        <div className="w-11 h-11 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
          <Code2
            size={22}
            className="text-sky-400"
          />
        </div>

      </div>

      {/* PROGRESS SECTION */}
      <div className="mt-5">

        <div className="flex justify-between items-center mb-2">

          <span className="text-xs sm:text-sm text-gray-400">
            Skill Level
          </span>

          <span className="text-sm font-medium text-sky-400">
            {skill.level}%
          </span>

        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">

          <div
            className="bg-sky-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${skill.level}%` }}
          />

        </div>

      </div>

    </div>
  );
}