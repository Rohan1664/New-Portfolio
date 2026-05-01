import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-6 rounded-xl shadow-md w-80">

                <h2 className="text-xl font-bold mb-4 text-center">
                    Admin Login 🔐
                </h2>

                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={e =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Password"
                    value={form.password}
                    onChange={e =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button
                    onClick={submit}
                    disabled={loading}
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </div>
        </div>
    );
}