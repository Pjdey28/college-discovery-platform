"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../services/axios";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const router = useRouter();
  const setToken = useAuthStore(state => state.setToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      router.push("/colleges");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Log in to access your saved colleges and discussions
        </p>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3.5 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
