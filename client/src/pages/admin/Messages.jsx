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
    <div className="relative z-10 p-4 sm:p-6">

      {/* TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
          <Mail size={22} />
          Messages
        </h1>

        <span className="text-sm text-gray-300">
          Total Messages: {messages.length}
        </span>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-300">
          <Loader2 className="animate-spin" size={18} />
          Loading messages...
        </div>
      )}

      {/* EMPTY */}
      {!loading && messages.length === 0 && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl text-center text-gray-300">
          No messages yet.
        </div>
      )}

      {/* MESSAGES LIST */}
      <div className="space-y-4">

        {messages.map((m) => (
          <div
            key={m._id}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl shadow-xl hover:border-cyan-400/40 transition"
          >

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">

              <div>
                <h2 className="font-semibold text-lg sm:text-xl text-white break-words">
                  {m.name}
                </h2>

                <p className="text-sm sm:text-base text-cyan-400 break-all">
                  {m.email}
                </p>
              </div>

            </div>

            {/* MESSAGE */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4">
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed break-words whitespace-pre-line">
                {m.message}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}