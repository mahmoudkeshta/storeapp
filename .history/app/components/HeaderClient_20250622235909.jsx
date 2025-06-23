"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderClient() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // لو تريد إعادة توجيه تلقائي بعد تسجيل الدخول، فعّل السطر التالي:
      // router.push("/category");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/aurh"); // صفحة تسجيل الدخول
  };

  return (
    <header
      style={{
        backgroundColor: "#FFEA00",
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
            <span>مرحباً، {user.name || "المستخدم"}</span>
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
    </header>
  );
}
