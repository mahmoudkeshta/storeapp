"use client"; // مهم جداً لو تستخدم Next 13 app directory مع React hooks

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  const [lang, setLang] = useState("ar"); // ar أو en
  const [dir, setDir] = useState("rtl"); // rtl أو ltr

  const toggleLang = () => {
    if (lang === "ar") {
      setLang("en");
      setDir("ltr");
    } else {
      setLang("ar");
      setDir("rtl");
    }
  };

  return (
    <html lang={lang} dir={dir}>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {/* الشريط العلوي الأصفر */}
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
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ cursor: "pointer" }}>🛒</span>
            <span style={{ cursor: "pointer" }}>♡</span>
            <span
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
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
                <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {lang === "ar" ? "تسجيل الدخول" : "Login"}
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={toggleLang}
              title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              {lang === "ar" ? "English" : "العربية"}
            </span>
          </div>
          <input
            type="search"
            placeholder={lang === "ar" ? "ما الذي تبحث عنه؟" : "What are you looking for?"}
            style={{
              flexGrow: 1,
              maxWidth: "400px",
              padding: "0.4rem 1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              outline: "none",
            }}
          />
        </header>

        {/* الشريط السفلي: الشعار و التوصيل و الأقسام */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.8rem 1.5rem",
            borderBottom: "1px solid #ddd",
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "1.8rem", color: "#f9a825" }}>
              {lang === "ar" ? "ن" : "N"}
            </span>
            <span>{lang === "ar" ? "نون" : "Noon"}</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_the_United_Arab_Emirates.svg/24px-Flag_of_the_United_Arab_Emirates.svg.png"
              alt={lang === "ar" ? "علم الإمارات" : "UAE Flag"}
              style={{ height: "18px", borderRadius: "2px" }}
            />
            <span
              style={{
                fontWeight: "normal",
                fontSize: "0.9rem",
                color: "#555",
              }}
            >
              {lang === "ar" ? "توصيل إلى دبي" : "Deliver to Dubai"}
            </span>
          </div>

          <ul
            style={{
              display: "flex",
              gap: "1rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
              flexWrap: "wrap",
            }}
          >
            {(lang === "ar"
              ? [
                  "الإلكترونيات",
                  "أزياء الرجال",
                  "أزياء النساء",
                  "أزياء الأولاد",
                  "المنزل",
                  "الجمال والعطور",
                  "الليبي",
                  "الألعاب",
                  "الرياضة",
                  "الصحة والتغذية",
                  "السيارات",
                  "القرطاسية",
                ]
              : [
                  "Electronics",
                  "Men's Fashion",
                  "Women's Fashion",
                  "Kids' Fashion",
                  "Home",
                  "Beauty & Perfumes",
                  "Libby",
                  "Toys",
                  "Sports",
                  "Health & Nutrition",
                  "Automotive",
                  "Stationery",
                ]
            ).map((item) => (
              <li
                key={item}
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
