"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

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

  const updateQuantity = (orderItemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.order_item_id === orderItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(10);
      showToast("تم تطبيق الكوبون بنجاح! خصم 10% مضاف.");
    } else {
      showToast("كوبون غير صالح!");
    }
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

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    return (total * (1 - discount / 100)).toFixed(2);
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
      <div>
        <h1 style={{ textAlign: "center", marginBottom: 20, color: "#ffce00" }}>عربة التسوق</h1>
        {loading ? (
          <p style={{ textAlign: "center", color: "#999" }}>جاري التحميل...</p>
        ) : cartItems.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>سلة المشتريات فارغة</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {cartItems.map((item) => (
            <div key={item.order_item_id}>
              {item.order_item_id ? (
                <Link
                  to={`/category/home/${item.order_item_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
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
                    <img
                      src={item.image_url || "https://via.placeholder.com/80"}
                      alt={item.nameproducts}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 6,
                        objectFit: "cover",
                        marginRight: 15,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>
                        {item.nameproducts}
                      </h3>
                      <p style={{ margin: "5px 0", color: "#555" }}>
                        السعر: {parseFloat(item.price).toFixed(2)} ر.س
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            updateQuantity(item.order_item_id, item.quantity - 1);
                          }}
                          disabled={item.quantity <= 1}
                          style={{
                            backgroundColor: "#ddd",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            updateQuantity(item.order_item_id, item.quantity + 1);
                          }}
                          style={{
                            backgroundColor: "#ddd",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCartItem(item.order_item_id);
                      }}
                      style={{
                        backgroundColor: "#ffce00",
                        border: "none",
                        color: "#333",
                        padding: "10px 15px",
                        borderRadius: 6,
                        cursor: "pointer",
                        marginLeft: 15,
                      }}
                    >
                      حذف
                    </button>
                  </div>
                </Link>
              ) : (
                <div
                  style={{
                    padding: 15,
                    borderRadius: 12,
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    textAlign: "center",
                    color: "#999",
                  }}
                >
                  عنصر غير صالح
                </div>
              )}
            </div>
          ))}
        </div>




        )}
      </div>

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
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 5 }}>إدخال كوبون:</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="أدخل الكوبون"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={applyCoupon}
              style={{
                padding: "10px 20px",
                backgroundColor: "#0066cc",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              تطبيق
            </button>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>إجمالي السعر:</label>
          <p style={{ fontWeight: "bold" }}>{calculateTotal()} ر.س</p>
        </div>
        <button
          style={{
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
          إتمام الطلب
        </button>
      </div>
    </div>
  );
}
