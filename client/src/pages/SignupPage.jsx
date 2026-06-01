import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup as signupAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const data = await signupAPI(form);

    if (data.token) {
      login(data);

      navigate("/");
    } else {
      setError(data.message || "SignUp failed");
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          rounded-3xl
          p-8
          shadow-xl
          border
        "
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-2
          "
        >
          Create Account
        </h1>

        <p
          className="
            mb-8
          "
          style={{
            color: "var(--text-muted)",
          }}
        >
          Sign up to continue
        </p>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="
              w-full
              p-4
              rounded-2xl
              outline-none
              border
            "
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--border)",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="
              w-full
              p-4
              rounded-2xl
              outline-none
              border
            "
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        <button
          type="submit"
          className="
            w-full
            mt-6
            py-4
            rounded-2xl
            text-white
            font-medium
          "
          style={{
            background: "var(--primary)",
          }}
        >
          SignUp
        </button>

        <p
          className="
            mt-6
            text-sm
            text-center
          "
          style={{
            color: "var(--text-muted)",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
