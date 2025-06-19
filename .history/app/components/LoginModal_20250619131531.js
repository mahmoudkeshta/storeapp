// components/LoginModal.js
import { useState } from "react";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>تسجيل الدخول</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
          />
          <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
            دخول
          </button>
        </form>
        <button
          onClick={onClose}
          style={{ marginTop: "1rem", width: "100%", padding: "0.5rem" }}
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}
