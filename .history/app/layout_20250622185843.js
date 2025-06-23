"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "متجر نون",
  description: "متجر نون - تصميم مشابه",
};

export default function RootLayout({ children }) {
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://codeeio.com/ecommerc/categories.php", {
          cache: "no-store",
        });
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("خطأ في جلب الأقسام:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <html lang="ar" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {/* ✅ الشريط العلوي */}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Link href="/cart" style={{ fontSize: "24px" }}>🛒</Link>
            <Link href="/favorites" style={{ fontSize: "24px" }}>♡</Link>
            <Link href="/auth" style={{ display: "flex", alignItems: "center" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
          </div>
          <input
            type="search"
            placeholder="ما الذي تبحث عنه؟"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              padding: "0.4rem 1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              backgroundColor: "#fff",
              direction: "rtl",
              textAlign: "right",
            }}
          />
        </header>

        {/* ✅ شريط الأقسام */}
        <nav
          style={{
            borderBottom: "1px solid #ddd",
            backgroundColor: "white",
            fontWeight: "bold",
            padding: "1rem",
          }}
        >
          {/* الشعار */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.8rem", color: "#f9a825" }}>ن</span>
              <span>نون</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_the_United_Arab_Emirates.svg/24px-Flag_of_the_United_Arab_Emirates.svg.png"
                alt="علم الإمارات"
                style={{ height: "18px", borderRadius: "2px" }}
              />
              <span style={{ fontSize: "0.9rem", color: "#555" }}>
                توصيل إلى دبي
              </span>
            </div>

            {/* القائمة المنسدلة */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          </div>

          {/* القائمة */}
          <ul
            style={{
              display: isMobileMenuOpen ? "block" : "none",
              listStyle: "none",
              padding: "1rem",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              margin: 0,
            }}
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <li
                  key={cat.id || cat.category_id}
                  style={{
                    padding: "0.5rem 0",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Link href={`/category/${cat.id}`} style={{ textDecoration: "none", color: "#000" }}>
                    {cat.name_ar_c}
                  </Link>
                </li>
              ))
            ) : (
              <li>لا توجد أقسام</li>
            )}
          </ul>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
