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
    <main className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-8 mx-4 sm:mx-0">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Welcome Back
        </h2>

        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email Address
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
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 mb-8 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300"
        >
          Login
        </button>

        {/* الخط الفاصل */}
        <hr className="my-6 border-gray-300" />

        {/* رسالة الخطأ تحت الخط */}
        {errorMessage && (
          <div className="text-center text-red-700 font-semibold">
            {errorMessage}
          </div>
        )}
      </div>
    </main>
  );
}
