"use client";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { token, logout } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="font-bold text-2xl text-indigo-600 tracking-tight">
        CollegeFinder
      </Link>

      <div className="flex gap-6 items-center font-medium text-sm">
        <Link href="/colleges" className="text-gray-600 hover:text-indigo-600 transition-colors">
          Colleges
        </Link>
        <Link href="/compare" className="text-gray-600 hover:text-indigo-600 transition-colors">
          Compare
        </Link>
        <Link href="/discussions" className="text-gray-600 hover:text-indigo-600 transition-colors">
          Discussions
        </Link>

        {isClient && token ? (
          <>
            <Link href="/predictor" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Predictor
            </Link>
            <Link href="/saved" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Saved
            </Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors ml-2"
            >
              Logout
            </button>
          </>
        ) : isClient ? (
          <div className="flex items-center gap-4 ml-2">
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Login
            </Link>
            <Link href="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
              Register
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}