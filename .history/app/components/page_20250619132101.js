"use client"; // 👈 مهم لأننا سنستخدم useState وهاندلر أحداث على الكلاينت

import { useState } from "react";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = (credentials) => {
    console.log("بيانات تسجيل الدخول:", credentials);
    // هنا تضع منطق تسجيل الدخول، مثلاً استدعاء API ثم إغلاق النافذة لو نجح
    setIsLoginOpen(false);
  };

  return (
    <>
      <header style={{ padding: "1rem", backgroundColor: "#FFEA00" }}>
        <span
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => setIsLoginOpen(true)}
        >
          تسجيل الدخول
        </span>
      </header>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      <main>
        <h1>مرحباً بك في متجر نون</h1>
      </main>
    </>
  );
}
