import { Link } from "react-router-dom";

export default function Dashboard() {
  const cards = [
    {
      title: "Projects",
      desc: "Add, edit, delete projects",
      link: "/admin/projects",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Skills",
      desc: "Manage your technical skills",
      link: "/admin/skills",
      color: "from-green-500 to-green-700",
    },
    {
      title: "Profile",
      desc: "Update personal info",
      link: "/admin/profile",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Messages",
      desc: "View contact messages",
      link: "/admin/messages",
      color: "from-red-500 to-red-700",
    },
  ];

  return (
    <div className="p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">
        Admin Dashboard ⚡
      </h1>

      <p className="text-gray-500 mb-6">
        Manage your portfolio content from here
      </p>

      {/* GRID CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`p-6 rounded-xl text-white bg-gradient-to-r ${card.color} shadow hover:scale-105 transition`}
          >
            <h2 className="text-xl font-bold mb-2">
              {card.title}
            </h2>

            <p className="text-sm opacity-90">
              {card.desc}
            </p>
          </Link>
        ))}

      </div>
    </div>
  );
}