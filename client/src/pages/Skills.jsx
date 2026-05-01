import { useEffect, useState } from "react";
import { getSkills } from "../services/skillService";
import SkillCard from "../components/SkillCard";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-950 text-white min-h-screen  pt-24 pb-16 items-center">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-bold text-center mb-10">
          My Skills ⚡
        </h1>

        {loading && (
          <p className="text-center text-gray-400">
            Loading skills...
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((s) => (
            <SkillCard key={s._id} skill={s} />
          ))}
        </div>

      </div>

    </section>
  );
}