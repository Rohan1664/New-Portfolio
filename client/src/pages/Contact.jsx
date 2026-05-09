import { useState, useContext } from "react";
import { sendMessage } from "../services/contactService";
import { ProfileContext } from "../context/ProfileContext";

import {
  Mail,
  Phone,
  MapPin,
  MessageSquare
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const { profile } = useContext(ProfileContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      await sendMessage(form);

      alert("Message sent successfully 🚀");

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <p className="text-white text-center mt-20">
        Loading...
      </p>
    );
  }

  return (
    <section className="bg-gray-950 text-white min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-6">

          {/* HEADER */}
          <div>

            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
              <MessageSquare className="text-blue-500" />
              Get in Touch
            </h1>

            <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed break-words">
              {profile.bio}
            </p>

          </div>

          {/* EMAIL */}
          {profile.email && (
            <div className="bg-gray-900 p-4 sm:p-5 rounded-2xl flex items-start gap-4">

              <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                <Mail className="text-blue-400" size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold text-base sm:text-lg">
                  Email
                </h2>

                <p className="text-gray-400 text-sm break-all">
                  {profile.email}
                </p>
              </div>

            </div>
          )}

          {/* PHONE */}
          {profile.mobile && (
            <div className="bg-gray-900 p-4 sm:p-5 rounded-2xl flex items-start gap-4">

              <div className="bg-green-500/10 p-3 rounded-xl shrink-0">
                <Phone className="text-green-400" size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-base sm:text-lg">
                  Phone
                </h2>

                <p className="text-gray-400 text-sm sm:text-base">
                  {profile.mobile}
                </p>
              </div>

            </div>
          )}

          {/* LOCATION */}
          {profile.location && (
            <div className="bg-gray-900 p-4 sm:p-5 rounded-2xl flex items-start gap-4">

              <div className="bg-red-500/10 p-3 rounded-xl shrink-0">
                <MapPin className="text-red-400" size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-base sm:text-lg">
                  Location
                </h2>

                <p className="text-gray-400 text-sm sm:text-base">
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
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition"
              >
                <FaGithub className="text-xl" />
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-800 transition"
              >
                <FaLinkedin className="text-xl" />
              </a>
            )}

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-gray-900 p-5 sm:p-7 rounded-2xl shadow-lg h-fit">

          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            Send Message 💬
          </h2>

          {/* NAME */}
          <input
            className="w-full p-3 sm:p-4 mb-4 bg-gray-800 rounded-xl outline-none border border-transparent focus:border-blue-500 text-sm sm:text-base"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />

          {/* EMAIL */}
          <input
            type="email"
            className="w-full p-3 sm:p-4 mb-4 bg-gray-800 rounded-xl outline-none border border-transparent focus:border-blue-500 text-sm sm:text-base"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          {/* MESSAGE */}
          <textarea
            className="w-full p-3 sm:p-4 mb-5 bg-gray-800 rounded-xl outline-none border border-transparent focus:border-blue-500 h-32 sm:h-40 resize-none text-sm sm:text-base"
            placeholder="Your Message"
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value
              })
            }
          />

          {/* BUTTON */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-70 transition p-3 sm:p-4 rounded-xl font-medium text-sm sm:text-base active:scale-[0.98]"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </div>

      </div>

    </section>
  );
}