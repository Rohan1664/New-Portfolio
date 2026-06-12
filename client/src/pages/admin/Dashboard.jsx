import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessages } from "../../services/contactService";

import {
  Folder,
  Wrench,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
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
    try {
      const res = await getMessages();
      setMessages(res.data || []);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const startIndex = (page - 1) * limit;
  const currentMessages = messages.slice(startIndex, startIndex + limit);

  const totalPages = Math.ceil(messages.length / limit);

  const cards = [
    {
      title: "Projects",
      desc: "Add, edit, delete projects",
      link: "/admin/projects",
      color: "from-blue-500 to-blue-700",
      icon: <Folder size={22} />,
    },
    {
      title: "Skills",
      desc: "Manage your technical skills",
      link: "/admin/skills",
      color: "from-green-500 to-green-700",
      icon: <Wrench size={22} />,
    },
    {
      title: "Profile",
      desc: "Update personal information",
      link: "/admin/profile",
      color: "from-purple-500 to-purple-700",
      icon: <User size={22} />,
    },
    {
      title: "Messages",
      desc: "View contact messages",
      link: "/admin/messages",
      color: "from-red-500 to-red-700",
      icon: <Mail size={22} />,
    },
  ];

  return (
    <div className="relative z-10 p-4 sm:p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-white mb-2">
        Admin Dashboard
      </h1>

      <p className="text-gray-300 mb-8">
        Manage your portfolio content from here
      </p>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`p-6 rounded-2xl text-white bg-gradient-to-r ${card.color} shadow-lg hover:scale-[1.02] active:scale-95 transition duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              {card.icon}
              <h2 className="text-xl font-bold">
                {card.title}
              </h2>
            </div>

            <p className="text-sm opacity-90">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* MESSAGE SECTION */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaEnvelopeOpenText />
            Latest Messages
          </h2>

          <span className="text-gray-300 text-sm">
            Total: {messages.length}
          </span>
        </div>

        {/* MESSAGE LIST */}
        <div className="space-y-4">
          {currentMessages.map((m) => (
            <div
              key={m._id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/20 transition"
            >
              <p className="font-semibold text-white break-words">
                {m.name}
              </p>

              <p className="text-sm text-gray-300 break-all">
                {m.email}
              </p>

              <p className="text-sm text-gray-200 mt-2 line-clamp-2 break-words">
                {m.message}
              </p>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {messages.length === 0 && (
          <div className="text-center py-10 text-gray-300">
            No messages found
          </div>
        )}

        {/* PAGINATION */}
        {messages.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            <span className="text-gray-300 text-sm">
              Page {page} of {totalPages || 1}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}