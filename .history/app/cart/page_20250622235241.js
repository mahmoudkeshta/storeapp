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

  const fetchCartItems = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch("https://codeeio.com/ecommerc/cart/viewcart.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id: userId }).toString(),
      });
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setCartItems(data.data);
      } else {
        setCartItems([]);
        setToastMessage(data.message || "لا توجد عناصر في السلة");
      }
    } catch (err) {
      setCartItems([]);
      setToastMessage("حدث خطأ أثناء جلب السلة");
    }
    setLoading(false);
  };

  return (
    <div style={{ direction: "rtl" }}>
      <h1>عربة التسوق</h1>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : cartItems.length === 0 ? (
        <p>سلة المشتريات فارغة</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.order_item_id}>
              {item.product_id ? (
               <Link href={`/category/home/${item.product_id}`} legacyBehavior>
               <a
                 style={{
                   textDecoration: "none",
                   color: "inherit",
                   display: "block",
                   marginBottom: "15px",
                   padding: "10px",
                   border: "1px solid #ddd",
                   borderRadius: "6px",
                   backgroundColor: "#f9f9f9",
                 }}
               >
                 <h3>{item.nameproducts}</h3>
                 <p>السعر: {item.price} ر.س</p>
               </a>
             </Link>
             
              ) : (
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #f5c6cb",
                    backgroundColor: "#f8d7da",
                    borderRadius: "6px",
                  }}
                >
                  بيانات المنتج غير متوفرة
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
