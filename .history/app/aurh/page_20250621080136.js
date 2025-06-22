
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
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      {/* العنوان + الفورم في عمود مركزي */}
      <div className="w-full max-w-md bg-gradient-to-br from-indigo-700 via-purple-800 to-indigo-900 rounded-3xl shadow-2xl p-10 backdrop-blur-sm bg-opacity-80">
        <h1 className="text-white text-4xl font-extrabold mb-10 text-center">
          تسجيل الدخول
        </h1>

        {/* رسالة الخطأ */}
        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-6 text-center font-semibold shadow-inner">
            {errorMessage}
          </div>
        )}

        {/* حقول الإدخال */}
        <label
          htmlFor="email"
          className="block text-indigo-100 font-semibold mb-2"
        >
          البريد الإلكتروني
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 mb-6 rounded-xl border border-indigo-300 bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
        />

        <label
          htmlFor="password"
          className="block text-indigo-100 font-semibold mb-2"
        >
          كلمة المرور
        </label>
        <input
          id="password"
          type="password"
          placeholder="ادخل كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 mb-8 rounded-xl border border-indigo-300 bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
        />

        {/* زر الدخول */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300"
        >
          تسجيل الدخول
        </button>
      </div>
    </main>
  );
}


