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
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-10 mx-4 sm:mx-0">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          Sign In
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center font-medium shadow-inner">
            {errorMessage}
          </div>
        )}

        <div className="mb-6 relative">
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition outline-none"
          />
          <span className="absolute right-4 top-[38px] text-gray-400 select-none text-lg sm:text-xl">
            📧
          </span>
        </div>

        <div className="mb-8 relative">
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition outline-none"
          />
          <span className="absolute right-4 top-[38px] text-gray-400 select-none text-lg sm:text-xl">
            🔒
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
        >
          Login
        </button>
      </div>
    </main>
  );
}
