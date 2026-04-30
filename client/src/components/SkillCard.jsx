export default function SkillCard({ skill }) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl shadow">

      <h2 className="text-lg font-semibold">{skill.name}</h2>
      <p className="text-gray-400">{skill.description}</p>

      <div className="w-full bg-gray-700 h-2 rounded mt-3">
        <div
          className="bg-sky-500 h-2 rounded"
          style={{ width: `${skill.level}%` }}
        />
      </div>

      <p className="text-sm text-gray-400 mt-2">
        {skill.level}%
      </p>

    </div>
  );
}