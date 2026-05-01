import { useEffect, useState } from "react";
import { getMessages } from "../../services/contactService";
import AdminLayout from "../../layouts/AdminLayout";
import {
  Mail,
} from "lucide-react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages()
      .then(res => setMessages(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (

    <div className="p-6">

      {/* Title */}
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Mail size={22} /> Messages
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading messages...</p>
      )}

      {/* Empty */}
      {!loading && messages.length === 0 && (
        <p className="text-gray-500">No messages yet.</p>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-xl text-gray-800">
                {m.name}
              </h2>
              <span className="text-xl text-gray-900">
                {m.email}
              </span>
            </div>

            {/* Message */}
            <p className="text-gray-600">
              {m.message}
            </p>
          </div>
        ))}
      </div>

    </div>

  );
}