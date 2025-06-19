"use client"; // لتفعيل التفاعل داخل هذا الملف

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

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

async function fetchCategories() {
  try {
    const res = await fetch("https://codeeio.com/ecommerc/categories.php", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("خطأ في جلب الأقسام:", error);
    return [];
  }
}

// مكون نافذة تسجيل الدخول (Modal)
function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* الخلفية المظلمة */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
        }}
      />
      {/* النافذة نفسها */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
          width: "320px",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>تسجيل الدخول</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("تم تسجيل الدخول (تجريبي)");
            onClose();
          }}
        >
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            id="email"
            type="email"
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <label htmlFor="password">كلمة المرور</label>
          <input
            id="password"
            type="password"
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "1.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.6rem",
              backgroundColor: "#f9a825",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            دخول
          </button>
        </form>
        <button
          onClick={onClose}
          style={{
            marginTop: "0.5rem",
            background: "transparent",
            border: "none",
            color: "#555",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          إغلاق
        </button>
      </div>
    </>
  );
}

export default async function RootLayout({ children }) {
  const categories = await fetchCategories();

  // حالة فتح/إغلاق نافذة تسجيل الدخول
  const [loginOpen, setLoginOpen] = useState(false);

  // لو كان هذا ملف Layout خاص بـ app directory في Next.js 13، فلا يمكن استخدام useState داخل async function
  // لذا الحل هو فصل المودال والتفاعل إلى مكون client component
  // سأفصل ذلك في كود client-side component بعد هنا

  return (
    <html lang="ar" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        <LayoutWithLogin categories={categories}>
          {children}
        </LayoutWithLogin>
      </body>
    </html>
  );
}

// مكون client side منفصل لدعم التفاعل (استخدام useState)
function LayoutWithLogin({ categories, children }) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      {/* الشريط العلوي */}
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
          <span style={{ cursor: "pointer" }}>🛒</span>
          <span style={{ cursor: "pointer" }}>♡</span>
          <span
            onClick={() => setLoginOpen(true)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              userSelect: "none",
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
          </span>
          <span>English</span>
        </div>

        {/* حقل البحث */}
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

      {/* شريط الأقسام */}
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

        {/* الكلمة في المنتصف */}
        <div style={{ fontSize: "1.1rem", color: "#f57c00" }}>🔥 عروض اليوم</div>

        {/* الأقسام */}
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
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li
                key={cat.id || cat.category_id}
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              >
                <Link href={`/category/${cat.id}`}>{cat.name_ar_c}</Link>
              </li>
            ))
          ) : (
            <li>لا توجد أقسام</li>
          )}
        </ul>
      </nav>

      <main>{children}</main>

      {/* مودال تسجيل الدخول */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
