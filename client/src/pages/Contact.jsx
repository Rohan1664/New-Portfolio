import { useState, useContext } from "react";
import { sendMessage } from "../services/contactService";
import { ProfileContext } from "../context/ProfileContext";

import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const { profile } = useContext(ProfileContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const submit = async () => {
    try {
      await sendMessage(form);
      alert("Message sent successfully 🚀");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message");
    }
  };

  if (!profile) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  return (
    <section className="bg-gray-950 text-white min-h-screen pt-24 pb-16">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageSquare className="text-blue-500" />
              Get in Touch
            </h1>

            <p className="text-gray-400 mt-2">
              {profile.bio}
            </p>
          </div>

          {/* EMAIL */}
          {profile.email && (
            <div className="bg-gray-900 p-5 rounded-xl flex items-center gap-3">
              <Mail className="text-blue-400" />
              <div>
                <h2 className="font-semibold">Email</h2>
                <p className="text-gray-400 text-sm">
                  {profile.email}
                </p>
              </div>
            </div>
          )}

          {/* PHONE */}
          {profile.mobile && (
            <div className="bg-gray-900 p-5 rounded-xl flex items-center gap-3">
              <Phone className="text-green-400" />
              <div>
                <h2 className="font-semibold">Phone</h2>
                <p className="text-gray-400 text-sm">
                  {profile.mobile}
                </p>
              </div>
            </div>
          )}

          {/* LOCATION (optional if you add later in DB) */}
          {profile.location && (
            <div className="bg-gray-900 p-5 rounded-xl flex items-center gap-3">
              <MapPin className="text-red-400" />
              <div>
                <h2 className="font-semibold">Location</h2>
                <p className="text-gray-400 text-sm">
                  {profile.location}
                </p>
              </div>
            </div>
          )}

          {/* SOCIAL LINKS */}
          <div className="flex gap-5 pt-2">

            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                className="text-2xl text-gray-400 hover:text-white transition"
              >
                <FaGithub />
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                className="text-2xl text-gray-400 hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </a>
            )}

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">
            Send Message 💬
          </h2>

          <input
            className="w-full p-3 mb-4 bg-gray-800 rounded outline-none"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="w-full p-3 mb-4 bg-gray-800 rounded outline-none"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            className="w-full p-3 mb-4 bg-gray-800 rounded outline-none h-32"
            placeholder="Your Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button
            onClick={submit}
            className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded font-medium"
          >
            Send Message
          </button>

        </div>

      </div>
    </section>
  );
}