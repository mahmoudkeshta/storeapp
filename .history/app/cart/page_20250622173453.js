"use client";

import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
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
        backgroundColor: "#f7f7f7",
        color: "#333",
        minHeight: "100vh",
        fontFamily: "'Roboto', sans-serif",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px",
      }}
    >
      {/* قائمة المنتجات */}
      <div>
        <h1 style={{ textAlign: "center", marginBottom: 20, color: "#ffce00" }}>عربة التسوق</h1>
        {loading ? (
          <p style={{ textAlign: "center", color: "#999" }}>جاري التحميل...</p>
        ) : cartItems.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>سلة المشتريات فارغة</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {cartItems.map((item) => (
              <div
                key={item.order_item_id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 15,
                  borderRadius: 12,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: "1px solid #ddd",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>{item.nameproducts}</h3>
                  <p style={{ margin: "5px 0", color: "#555" }}>الكمية: {item.quantity}</p>
                  <p style={{ margin: "5px 0", color: "#333", fontWeight: "bold" }}>
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
                    backgroundColor: "#ffce00",
                    border: "none",
                    color: "#333",
                    padding: "10px 15px",
                    borderRadius: 6,
                    cursor: "pointer",
                    marginLeft: 15,
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffdf50")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffce00")}
                  aria-label="حذف المنتج من السلة"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ملخص الطلب */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        <h2 style={{ marginBottom: 20, color: "#333" }}>ملخص الطلب</h2>
        <div style={{ marginBottom: 10 }}>
          <label style={{ color: "#555", marginBottom: 5 }}>إجمالي السعر:</label>
          <p style={{ fontWeight: "bold", fontSize: 18 }}>222.50 ر.س</p>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ color: "#555", marginBottom: 5 }}>رسوم الشحن:</label>
          <p style={{ fontWeight: "bold", fontSize: 18 }}>مجاني</p>
        </div>
        <div>
          <label style={{ color: "#555", marginBottom: 5 }}>الإجمالي:</label>
          <p style={{ fontWeight: "bold", fontSize: 20, color: "#ffce00" }}>222.50 ر.س</p>
        </div>
        <button
          style={{
            marginTop: 20,
            width: "100%",
            padding: "10px 15px",
            backgroundColor: "#0066cc",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          صفحة الدفع
        </button>
      </div>
    </div>
  );
}
