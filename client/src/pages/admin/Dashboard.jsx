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
      desc: "Update personal info",
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
    <div className="p-4 sm:p-6">

      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Admin Dashboard
      </h1>

      <p className="text-sm sm:text-base text-gray-500 mb-6">
        Manage your portfolio content from here
      </p>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`p-5 sm:p-6 rounded-2xl text-white bg-gradient-to-r ${card.color} shadow-md hover:scale-[1.02] active:scale-95 transition duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              {card.icon}
              <h2 className="text-lg sm:text-xl font-bold">
                {card.title}
              </h2>
            </div>

            <p className="text-sm opacity-90">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* MESSAGES PREVIEW */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <FaEnvelopeOpenText />
            Latest Messages
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
              className="border p-4 rounded-xl hover:bg-gray-50 transition"
            >
              <p className="font-semibold text-sm sm:text-base break-words">
                {m.name}
              </p>

              <p className="text-xs sm:text-sm text-gray-500 break-all">
                {m.email}
              </p>

              <p className="text-sm mt-2 text-gray-700 line-clamp-2 break-words">
                {m.message}
              </p>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {messages.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No messages found
          </div>
        )}

        {/* PAGINATION */}
        {messages.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            <span className="text-sm text-gray-500 text-center">
              Page {page} of {totalPages || 1}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
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