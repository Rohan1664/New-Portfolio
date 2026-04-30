import { useState } from "react";
import { sendMessage } from "../services/contactService";
import Navbar from "../components/Navbar";

export default function Contact() {
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

  return (
    <>

      <section className="bg-gray-950 text-white min-h-screen  py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          {/* LEFT - CONTACT INFO */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">
              Get in Touch 📩
            </h1>

            <p className="text-gray-400">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>

            <div className="bg-gray-900 p-5 rounded-xl">
              <h2 className="font-semibold mb-2">📧 Email</h2>
              <p className="text-gray-400">aditya@example.com</p>
            </div>

            <div className="bg-gray-900 p-5 rounded-xl">
              <h2 className="font-semibold mb-2">📱 Phone</h2>
              <p className="text-gray-400">+91 98765 43210</p>
            </div>

            <div className="bg-gray-900 p-5 rounded-xl">
              <h2 className="font-semibold mb-2">📍 Location</h2>
              <p className="text-gray-400">India</p>
            </div>
          </div>

          {/* RIGHT - FORM */}
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
    </>
  );
}