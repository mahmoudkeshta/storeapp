"use client";

import React, { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const response = await fetch("https://yourapi.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Failed to login");

      const data = await response.json();

      if (data.status === "success") {
        alert(`Welcome, ${data.data.username}!`);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.data.user_id,
            username: data.data.username,
            role: data.data.role,
            phone: data.data.phone_number,
          })
        );
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      <h1 className="text-white text-5xl font-extrabold mb-12 text-center">
        تسجيل الدخول
      </h1>

      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-8">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center font-semibold shadow-inner">
            {errorMessage}
          </div>
        )}

        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          البريد الإلكتروني
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
        />

        <label
          htmlFor="password"
          className="block text-gray-700 font-semibold mb-2"
        >
          كلمة المرور
        </label>
        <input
          id="password"
          type="password"
          placeholder="ادخل كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 mb-8 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300"
        >
          تسجيل الدخول
        </button>
      </div>
    </main>
  );
}
