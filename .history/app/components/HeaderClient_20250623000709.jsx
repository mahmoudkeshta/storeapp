"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderClient() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedName = localStorage.getItem("username");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedName) {
      setUsername(storedName);
    }
  }, []); // تنفذ مرة واحدة عند تحميل المكون فقط
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username"); // ينصح تحذف الاسم كمان عند تسجيل الخروج
    setUser(null);
    setUsername("");
    router.push("/aurh"); // إعادة التوجيه لصفحة تسجيل الدخول
  };
  

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header
      style={{
        backgroundColor: "#FFEA00",
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1.5rem",
        fontWeight: "bold",
        fontSize: "0.9rem",
        gap: "1rem",
        color: "#000",
        height: "60px",
      }}
    >
      {/* الأيقونات links */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link
          href="/cart"
          style={{
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
            fontSize: "24px",
          }}
        >
          🛒
        </Link>

        <Link
          href="/favorites"
          style={{
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
            fontSize: "24px",
          }}
        >
          ♡
        </Link>

        {user ? (
          <>
         <span>مرحباً، {username || "المستخدم"}</span>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              تسجيل خروج
            </button>
          </>
        ) : (
          <Link
            href="/aurh"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            تسجيل الدخول
          </Link>
        )}

        <span>English</span>
      </div>

      {/* البحث في المنتصف */}
      <form
        onSubmit={handleSearchSubmit}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          maxWidth: "90vw",
          zIndex: 1,
        }}
      >
        <input
          type="search"
          placeholder="ما الذي تبحث عنه؟"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.4rem 1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
            backgroundColor: "#fff",
            direction: "rtl",
            textAlign: "right",
          }}
        />
      </form>
    </header>
  );
}
