"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/axios";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submit = async () => {

    try {

      setLoading(true);

      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      router.push("/login");

    } catch (error) {

      console.error(error);

      alert("Registration Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      "
    >
      <div
        className="
        w-full
        max-w-md
        border
        rounded-xl
        p-8
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-6
          "
        >
          Register
        </h1>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
        />

        <button
          onClick={submit}
          disabled={loading}
          className="
          w-full
          bg-black
          text-white
          p-3
          rounded
          "
        >
          {
            loading
              ? "Creating..."
              : "Register"
          }
        </button>
      </div>
    </div>
  );
}