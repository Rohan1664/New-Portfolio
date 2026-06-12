import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Already logged in
  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const from =
    location.state?.from?.pathname || "/admin/dashboard";

  const submit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form);

      if (!res?.data?.token) {
        throw new Error("Token not found");
      }

      login(res.data.token);

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 relative overflow-hidden">

      {/* BACKDROP */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8">

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Admin Login 🔐
          </h2>

          <p className="text-center text-gray-300 mb-8">
            Sign in to access your dashboard
          </p>

          <form
            onSubmit={submit}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}