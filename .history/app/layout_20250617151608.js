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
  title: "Noon Style Store",
  description: "متجر نون - تصميم مشابه",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ fontFamily: "var(--font-geist-sans)" }}>
        {/* الشريط العلوي الأصفر */}
        <header style={{
          backgroundColor: "#FFEA00",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1.5rem",
          fontWeight: "bold",
          fontSize: "0.9rem",
          gap: "1rem",
          color: "#000",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ cursor: "pointer" }}>🛒</span>
            <span style={{ cursor: "pointer" }}>♡</span>
            <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user" width="18" height="18" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-3-3.87"></path><path d="M4 21v-2a4 4 0 0 1 3-3.87"></path><circle cx="12" cy="7" r="4"></circle></svg>
              تسجيل الدخول
            </span>
            <span>English</span>
          </div>
          <input 
            type="search" 
            placeholder="ما الذي تبحث عنه؟" 
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

        {/* الشريط السفلي: الشعار و التوصيل و الاقسام */}
        <nav style={{
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
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <span style={{ fontSize: "1.8rem", color: "#f9a825" }}>ن</span>
            <span>نون</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_the_United_Arab_Emirates.svg/24px-Flag_of_the_United_Arab_Emirates.svg.png" alt="UAE Flag" style={{ height: "18px", borderRadius: "2px" }} />
            <span style={{ fontWeight: "normal", fontSize: "0.9rem", color: "#555" }}>توصيل إلى دبي</span>
          </div>

          <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, margin: 0, flexWrap: "wrap" }}>
            {[
              "الإلكترونيات", "أزياء الرجال", "أزياء النساء", "أزياء الأولاد", "المنزل", 
              "الجمال والعطور", "الليبي", "الألعاب", "الرياضة", "الصحة والتغذية", 
              "السيارات", "القرطاسية"
            ].map((item) => (
              <li key={item} style={{ cursor: "pointer", whiteSpace: "nowrap" }}>
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
