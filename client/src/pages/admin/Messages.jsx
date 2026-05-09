import { useEffect, useState } from "react";
import { getMessages } from "../../services/contactService";

import {
  Mail,
  Loader2
} from "lucide-react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages()
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">

      {/* TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Mail size={22} />
          Messages
        </h1>

        <span className="text-sm text-gray-500">
          Total Messages: {messages.length}
        </span>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="animate-spin" size={18} />
          Loading messages...
        </div>
      )}

      {/* EMPTY */}
      {!loading && messages.length === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow text-center text-gray-500">
          No messages yet.
        </div>
      )}

      {/* MESSAGES LIST */}
      <div className="space-y-4">

        {messages.map((m) => (
          <div
            key={m._id}
            className="bg-white p-4 sm:p-5 rounded-2xl shadow border hover:shadow-md transition"
          >

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">

              <div>
                <h2 className="font-semibold text-lg sm:text-xl text-gray-800 break-words">
                  {m.name}
                </h2>

                <p className="text-sm sm:text-base text-blue-600 break-all">
                  {m.email}
                </p>
              </div>

            </div>

            {/* MESSAGE */}
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words whitespace-pre-line">
                {m.message}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}