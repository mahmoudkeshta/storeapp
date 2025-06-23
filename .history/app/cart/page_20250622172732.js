"use client";

import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // قراءة userId من localStorage عند تحميل الصفحة فقط (في المتصفح)
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchCartItems(storedUserId);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const fetchCartItems = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch("https://codeeio.com/ecommerc/cart/viewcart.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id: userId }).toString(),
      });
      if (!response.ok) throw new Error("فشل تحميل السلة");
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setCartItems(data.data);
      } else {
        setCartItems([]);
        showToast(data.message || "لا توجد عناصر في السلة");
      }
    } catch (err) {
      setCartItems([]);
      showToast("حدث خطأ أثناء جلب السلة");
      console.error(err);
    }
    setLoading(false);
  };

  const deleteCartItem = async (orderItemId) => {
    if (!userId) return;
    try {
      const response = await fetch("https://codeeio.com/ecommerc/cart/deletecartitem.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ order_item_id: orderItemId, user_id: userId }).toString(),
      });
      const data = await response.json();
      if (data.status === "success") {
        showToast("تم حذف المنتج من السلة");
        // تحديث العرض بدون العنصر المحذوف
        setCartItems((prev) => prev.filter((item) => item.order_item_id !== orderItemId));
      } else {
        showToast(data.message || "فشل حذف المنتج");
      }
    } catch (err) {
      showToast("حدث خطأ أثناء حذف المنتج");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "auto",
        padding: 20,
        direction: "rtl",
        backgroundColor: "#121212",
        color: "#eee",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>سلة المشتريات</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>جاري التحميل...</p>
      ) : cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>سلة المشتريات فارغة</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {cartItems.map((item) => (
            <div
              key={item.order_item_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#1e1e1e",
                boxShadow: "0 0 10px rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: "#fff" }}>{item.nameproducts}</h3>
                <p style={{ margin: "5px 0", color: "#bbb" }}>الكمية: {item.quantity}</p>
                <p style={{ margin: "5px 0", color: "#fff" }}>
                  السعر الإجمالي: {(parseFloat(item.price) * item.quantity).toFixed(2)} ر.س
                </p>
              </div>
              <img
                src={item.image_url}
                alt={item.nameproducts}
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, marginLeft: 15 }}
              />
              <button
                onClick={() => deleteCartItem(item.order_item_id)}
                style={{
                  backgroundColor: "#e53935",
                  border: "none",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: 6,
                  cursor: "pointer",
                  marginLeft: 15,
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b71c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e53935")}
                aria-label="حذف المنتج من السلة"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}

      {/* توست إشعارات */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 8,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
