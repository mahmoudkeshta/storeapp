"use client";

import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const userId = "7"; // رقم المستخدم

  useEffect(() => {
    fetchCartItems(userId);
  }, [userId]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(
        "https://codeeio.com/ecommerc/cart/viewcart.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ id: userId }).toString(),
        }
      );

      if (!response.ok) {
        throw new Error("خطأ في استرجاع البيانات");
      }

      const data = await response.json();

      if (data.status === "success" && Array.isArray(data.data)) {
        setCartItems(data.data);
      } else {
        setCartItems([]);
        console.warn(data.message || "لا توجد بيانات");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء جلب السلة:", error);
      setCartItems([]);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        direction: "rtl",
      }}
    >
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>سلة المشتريات</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>سلة المشتريات فارغة</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {cartItems.map((item) => (
            <div
              key={item.order_item_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ flex: "1" }}>
                <h3 style={{ margin: 0 }}>{item.nameproducts}</h3>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  الكمية: {item.quantity}
                </p>
                <p style={{ margin: "5px 0", color: "#222" }}>
                  السعر الإجمالي: {(parseFloat(item.price) * item.quantity).toFixed(2)} ر.س
                </p>
              </div>
              <img
                src={item.image_url}
                alt={item.nameproducts}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
