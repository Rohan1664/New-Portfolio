import { useEffect, useState } from "react";
import { getSkills } from "../services/skillService";
import SkillCard from "../components/SkillCard";

import {
  Code2,
  Loader2
} from "lucide-react";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-950 text-white min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-10 sm:mb-14">

          <div className="flex justify-center mb-4">

            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <Code2
                size={32}
                className="text-purple-500"
              />
            </div>

          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            My Skills ⚡
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2">
            A collection of technologies, tools, and frameworks
            I use to build modern, scalable, and responsive
            web applications.
          </p>

        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">

            <Loader2
              size={34}
              className="animate-spin mb-4"
            />

            <p className="text-sm sm:text-base">
              Loading skills...
            </p>

          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && skills.length === 0 && (
          <div className="bg-gray-900 rounded-2xl p-8 text-center text-gray-400">

            <h2 className="text-xl font-semibold mb-2">
              No Skills Found
            </h2>

            <p className="text-sm sm:text-base">
              Skills will appear here once added.
            </p>

          </div>
        )}

        {/* ================= SKILLS GRID ================= */}
        {!loading && skills.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">

            {skills.map((s) => (
              <div
                key={s._id}
                className="h-full"
              >
                <SkillCard skill={s} />
              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}