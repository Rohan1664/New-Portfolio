import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ where user tried to go
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const submit = async () => {
    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await loginUser(form);

      login(res.data.token);

      // ✅ redirect properly
      navigate(from, { replace: true });

    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">

      {/* LOGIN CARD */}
      <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-lg">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
          Admin Login 🔐
        </h2>

        <p className="text-sm sm:text-base text-gray-500 text-center mb-6">
          Sign in to access your dashboard
        </p>

        {/* EMAIL */}
        <input
          type="email"
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full border border-gray-300 p-3 mb-5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 active:scale-[0.98] transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>
  );
}