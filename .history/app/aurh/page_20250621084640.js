"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
export default function Auth() {
  const [email, setEmail] = useState("1");
  const [password, setPassword] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    if (!email.trim() || !password.trim()) {
      setErrorMessage("الرجاء إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }
    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);
  
      const response = await fetch("https://codeeio.com/ecommerc/aurh/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
  
      if (!response.ok) throw new Error("Failed to login");
  
      const data = await response.json();
  
      if (data.status === "success") {
        alert(`Welcome, ${data.data.username}!`);
        router.push("https://www.google.com/?client=safari&channel=ipad_bm"); 
        // تخزين البيانات في localStorage (كما عندك)
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.data.user_id,
            username: data.data.username,
            role: data.data.role,
            phone: data.data.phone_number,
          })
        );
  
        // تخزين اسم المستخدم والـ id في الكوكيز لمدة 7 أيام
        function setCookie(name, value, days) {
          const expires = new Date(Date.now() + days * 864e5).toUTCString();
          document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
        }
  
        setCookie("username", data.data.username, 7);
        setCookie("user_id", data.data.user_id, 7);
     
      } else {
        setErrorMessage("بيانات الدخول غير صحيحة.");
      }
    } catch {
      setErrorMessage("حدث خطأ أثناء تسجيل الدخول.");
    }
  };
  
  
  
  return (
    <>
      {/* استيراد بوتستراب من CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <main className="d-flex align-items-center justify-content-center min-vh-100 bg-dark">
        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="card-title text-center mb-4 fw-bold">تسجيل الدخول</h2>

          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            noValidate
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">
                كلمة المرور
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="ادخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              تسجيل الدخول
            </button>
          </form>
        </div>

        {/* تخصيص css */}
        <style jsx>{`
          main {
            background: linear-gradient(135deg, #4f46e5, #9333ea);
          }
          .card {
            border-radius: 1.5rem;
            background: rgba(255 255 255 / 0.9);
          }
          .form-control:focus {
            border-color: #7c3aed;
            box-shadow: 0 0 0 0.25rem rgb(124 58 237 / 0.25);
          }
          .btn-primary {
            background: linear-gradient(90deg, #7c3aed 0%, #4f46e5 100%);
            border: none;
          }
          .btn-primary:hover {
            background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
          }
        `}</style>
      </main>
    </>
  );
}
