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

async function fetchCategories() {
  try {
    const res = await fetch("https://codeeio.com/ecommerc/categories.php", {
      cache: "no-store", // أو حسب حاجتك للـ caching
    });
    const data = await res.json();
    // حسب شكل الاستجابة، غالبا يكون data.data
    return data.data || [];
  } catch (error) {
    console.error("خطأ في جلب الأقسام:", error);
    return [];
  }
}

export default async function RootLayout({ children }) {
  const categories = await fetchCategories();

  return (
    <html lang="ar" dir="ltr">
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
              تسجيل الدخول
            </span>
            <span>English</span>
          </div>
          <input
  type="search"
  placeholder="ما الذي تبحث عنه؟"
  style={{
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "1400px",
    padding: "0.4rem 1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    zIndex: 1,
    backgroundColor: "#fff",
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
                <Link
                href={`/category/${cat.id}`}
                ><li
                key={cat.category_id}
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {cat.name_ar_c}
              </li></Link>
              
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
