"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
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

export default async function RootLayout({ children }) {
  const categories = await fetchCategories();

  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} d-flex flex-column min-vh-100`}
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {/* الشريط العلوي */}
        <header className="bg-warning d-flex justify-content-between align-items-center px-3" style={{ height: "60px" }}>
          <div className="d-flex align-items-center gap-3 fw-bold text-dark">
            <span style={{ cursor: "pointer" }}>🛒</span>
            <span style={{ cursor: "pointer" }}>♡</span>
            <span className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
          <div className="flex-grow-1 mx-3 position-relative d-flex justify-content-center">
            <input
              type="search"
              placeholder="ما الذي تبحث عنه؟"
              className="form-control text-end"
              style={{ maxWidth: "700px" }}
              dir="rtl"
            />
          </div>
        </header>

        {/* شريط الأقسام */}
        <nav className="d-flex justify-content-between align-items-center border-bottom bg-white px-5 flex-wrap" style={{ gap: "1rem" }}>
          {/* الشعار */}
          <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
            <span className="fs-3 text-warning fw-bold">ن</span>
            <span className="fw-bold">نون</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_the_United_Arab_Emirates.svg/24px-Flag_of_the_United_Arab_Emirates.svg.png"
              alt="علم الإمارات"
              style={{ height: "18px", borderRadius: "2px" }}
            />
            <span className="text-secondary fs-7">توصيل إلى دبي</span>
          </div>

          {/* عروض اليوم */}
          <div className="text-warning fs-5 fw-bold">🔥 عروض اليوم</div>

          {/* الأقسام */}
          <ul className="d-flex flex-wrap list-unstyled gap-3 mb-0">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <li key={cat.id || cat.category_id} style={{ whiteSpace: "nowrap", cursor: "pointer" }}>
                  <Link href={`/category/${cat.id}`} className="text-decoration-none text-dark">
                    {cat.name_ar_c}
                  </Link>
                </li>
              ))
            ) : (
              <li>لا توجد أقسام</li>
            )}
          </ul>
        </nav>

        {/* المحتوى الرئيسي */}
        <main className="flex-grow-1 px-4 py-3">{children}</main>
      </body>
    </html>
  );
}
