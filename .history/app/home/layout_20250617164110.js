import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

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
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          fontFamily: "var(--font-geist-sans)",
          margin: 0,
          display: "flex",
          backgroundColor: "#fafafa",
        }}
      >
        {/* ✅ الشريط الجانبي فقط */}
        <aside
          style={{
            width: "260px",
            height: "100vh",
            position: "sticky",
            top: 0,
            backgroundColor: "#ffffff",
            borderLeft: "1px solid #e0e0e0",
            padding: "20px",
            overflowY: "auto",
            boxShadow: "-2px 0 5px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#333" }}>الفلاتر</h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2", color: "#555" }}>
            <li>الشحن من قبل نون</li>
            <li>الفئة</li>
            <li>الماركة</li>
            <li>السعر</li>
            <li>العروض</li>
            <li>أقل سعر</li>
            <li>تقييم المنتج</li>
            <li>الحجم</li>
            <li>وصل حديثاً</li>
            <li>نوع الرياضة</li>
            <li>نمط إصبع القدم</li>
            <li>التصميم</li>
            <li>اللون</li>
            <li>قسم الأزياء</li>
            <li>حالة المنتج</li>
            <li>مادة واحدة</li>
            <li>نوع الكعب</li>
            <li>شكل الكعب</li>
            <li>مقاس العرض</li>
            <li>ارتفاع الكعب</li>
            <li>المناسبة</li>
            <li>تعليمات العناية</li>
            <li>طريقة الإغلاق</li>
            <li>البائع</li>
          </ul>
        </aside>
      </body>
    </html>
  );
}
