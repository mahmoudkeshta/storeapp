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
  description: "شريط جانبي فقط",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          fontFamily: "var(--font-geist-sans)",
          margin: 0,
          padding: 0,
          display: "flex",
        }}
      >
        {/* ✅ الشريط الجانبي الثابت على اليمين */}
        <aside
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "250px",
            height: "100vh",
            backgroundColor: "#f9f9f9",
            borderLeft: "1px solid #ddd",
            padding: "1rem",
            boxShadow: "-2px 0 5px rgba(0,0,0,0.05)",
            zIndex: 1000,
          }}
        >
          <h3 style={{ marginTop: 0 }}>القائمة</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ padding: "0.5rem 0", cursor: "pointer" }}>الرئيسية</li>
            <li style={{ padding: "0.5rem 0", cursor: "pointer" }}>المنتجات</li>
            <li style={{ padding: "0.5rem 0", cursor: "pointer" }}>طلباتي</li>
            <li style={{ padding: "0.5rem 0", cursor: "pointer" }}>المفضلة</li>
            <li style={{ padding: "0.5rem 0", cursor: "pointer" }}>تسجيل الخروج</li>
          </ul>
        </aside>

        {/* ✅ محتوى الموقع */}
        <main
          style={{
            flex: 1,
            padding: "2rem",
            marginRight: "250px", // نفس عرض الشريط الجانبي
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
