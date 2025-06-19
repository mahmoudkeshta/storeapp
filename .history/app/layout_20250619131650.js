"use client";

import { useState } from "react";
import Link from "next/link";
import LoginModal from "../components/LoginModal"; // تأكد من المسار

export default function HeaderClient({ categories }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
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
        {/* عناصر التفاعل */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
          }}
          onClick={() => setShowLogin(true)}
        >
          <span>🛒</span>
          <span>♡</span>
          <span
            style={{
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

        {/* عروض اليوم */}
        <div style={{ fontSize: "1.1rem", color: "#f57c00" }}>🔥 عروض اليوم</div>

        {/* قائمة الأقسام */}
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
                <Link href={`/category/${cat.id || cat.category_id}`}>
                  {cat.name_ar_c}
                </Link>
              </li>
            ))
          ) : (
            <li>لا توجد أقسام</li>
          )}
        </ul>
      </nav>

      {/* مودال تسجيل الدخول */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
