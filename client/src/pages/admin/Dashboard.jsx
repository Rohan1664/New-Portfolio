import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessages } from "../../services/contactService";

// ✅ Icons
import {
  Folder,
  Wrench,
  User,
  Mail,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { FaEnvelopeOpenText } from "react-icons/fa";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const res = await getMessages();
    setMessages(res.data);
  };

  // ✅ Pagination Logic
  const startIndex = (page - 1) * limit;
  const currentMessages = messages.slice(startIndex, startIndex + limit);

  const totalPages = Math.ceil(messages.length / limit);

  const cards = [
    {
      title: "Projects",
      desc: "Add, edit, delete projects",
      link: "/admin/projects",
      color: "from-blue-500 to-blue-700",
      icon: <Folder size={22} />
    },
    {
      title: "Skills",
      desc: "Manage your technical skills",
      link: "/admin/skills",
      color: "from-green-500 to-green-700",
      icon: <Wrench size={22} />
    },
    {
      title: "Profile",
      desc: "Update personal info",
      link: "/admin/profile",
      color: "from-purple-500 to-purple-700",
      icon: <User size={22} />
    },
    {
      title: "Messages",
      desc: "View contact messages",
      link: "/admin/messages",
      color: "from-red-500 to-red-700",
      icon: <Mail size={22} />
    },
  ];

  return (
    <div className="p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">
        Admin Dashboard 
      </h1>

      <p className="text-gray-500 mb-6">
        Manage your portfolio content from here
      </p>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`p-6 rounded-xl text-white bg-gradient-to-r ${card.color} shadow hover:scale-105 transition`}
          >
            <div className="flex items-center gap-3 mb-3">
              {card.icon}
              <h2 className="text-xl font-bold">{card.title}</h2>
            </div>

            <p className="text-sm opacity-90">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* MESSAGES PREVIEW */}
      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaEnvelopeOpenText /> Latest Messages
          </h2>

          <span className="text-sm text-gray-500">
            Total: {messages.length}
          </span>
        </div>

        {/* MESSAGE LIST */}
        <div className="space-y-4">
          {currentMessages.map((m) => (
            <div
              key={m._id}
              className="border p-4 rounded-lg hover:bg-gray-50 transition"
            >
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-500">{m.email}</p>
              <p className="text-sm mt-2 text-gray-700 line-clamp-2">
                {m.message}
              </p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <span className="text-sm text-gray-500">
            Page {page} of {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next <ChevronRight size={16} />
          </button>

        </div>

      </div>
    </div>
  );
}