import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderClient from "./components/HeaderClient"; // المكون الجديد

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
    <html lang="ar" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {/* هيدر يعمل كـ Client Component */}
        <HeaderClient />

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

          {/* 🔥 عروض اليوم */}
          <div style={{ fontSize: "1.1rem", color: "#f57c00" }}>
            🔥 عروض اليوم
          </div>

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
                  <a href={`/category/${cat.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {cat.name_ar_c}
                  </a>
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
