"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../services/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await api.post("/auth/register", { name, email, password });
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">
          Create an Account
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Join us to discover your dream college
        </p>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3.5 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm text-sm"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
