"use client"; // إضافة التوجيه

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

  // دالة لجلب الأقسام
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

  // جلب البيانات عند التحميل
  useEffect(() => {
    fetchCategories();
  }, []);

  // دالة لتبديل القائمة المنسدلة
  function toggleMobileMenu() {
    setMobileMenuOpen((prev) => !prev);
  }

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* أيقونة عربة التسوق كرابط */}
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

            {/* أيقونة القلب كرابط */}
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

            <Link
              href="/auth"
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
            <span>English</span>
          </div>

          {/* ✅ حقل البحث في منتصف الهيدر */}
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
              outline: "none",
              zIndex: 1,
              backgroundColor: "#fff",
              direction: "rtl",
              textAlign: "right",
            }}
          />
        </header>

        {/* ✅ شريط الأقسام */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.8rem 5.9rem",
            borderBottom: "1px solid #ddd",
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* الشعار */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "1.8rem", color: "#f9a825" }}>ن</span>
            <span>نون</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_the_United_Arab_Emirates.svg/24px-Flag_of_the_United_Arab_Emirates.svg.png"
              alt="علم الإمارات"
              style={{ height: "18px", borderRadius: "2px" }}
            />
            <span
              style={{
                fontWeight: "normal",
                fontSize: "0.9rem",
                color: "#555",
              }}
            >
              توصيل إلى دبي
            </span>
          </div>

          {/* القائمة */}
          <ul
            style={{
              display: isMobileMenuOpen ? "block" : "none",
              listStyle: "none",
              padding: 0,
              margin: 0,
              position: "absolute",
              top: "60px",
              left: 0,
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #ddd",
              zIndex: 100,
            }}
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <li
                  key={cat.id || cat.category_id}
                  style={{
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Link href={`/category/${cat.id}`}>{cat.name_ar_c}</Link>
                </li>
              ))
            ) : (
              <li style={{ padding: "0.5rem 1rem" }}>لا توجد أقسام</li>
            )}
          </ul>

          {/* أيقونة القائمة المنسدلة */}
          <div
            onClick={toggleMobileMenu}
            style={{
              cursor: "pointer",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            ☰
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
