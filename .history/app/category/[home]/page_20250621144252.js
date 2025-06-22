"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function PostPage({ params }) {
  const { home: project1 } = params;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [likedItems, setLikedItems] = useState({});
  const debounceTimeout = useRef(null);
  const [cartItems, setCartItems] = useState([]);

  const userId = "8";

  useEffect(() => {
    fetch(`https://codeeio.com/ecommerc/categories/web.php/${project1}`)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data || []);
        setFilteredProducts(result.data || []);
      });
  }, [project1]);

  // دالة توست
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  // إرسال المنتج للسلة
  const sendCartToServer = async ({ product_id, quantity, price }) => {
    const total_amount = quantity * price;
    const status = "pending";

    try {
      const response = await fetch("https://codeeio.com/ecommerc/cart/cart.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          user_id: userId,
          product_id,
          quantity: quantity.toString(),
          price: price.toString(),
          total_amount: total_amount.toString(),
          status,
        }).toString(),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("تم إضافة المنتج إلى السلة بنجاح!");
        return true;
      } else {
        showToast(`خطأ: ${data.message || "لم يتم الإضافة"}`);
        return false;
      }
    } catch {
      showToast("حدث خطأ أثناء الإضافة للسلة");
      return false;
    }
  };

  const addToCart = async (product) => {
    const quantity = 1;
    const price = product.price || 0;

    const success = await sendCartToServer({
      product_id: product.product_id,
      quantity,
      price,
    });

    if (success) {
      setCartItems((prev) => [...prev, { ...product, quantity }]);
    }
  };

  const toggleLike = (productId) => {
    setLikedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={"full" + i} style={{ color: "#f5a623" }}>★</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" style={{ color: "#f5a623" }}>☆</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={"empty" + stars.length} style={{ color: "#ccc" }}>★</span>);
    }
    return stars;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "2px",
        maxWidth: "2000px",
        margin: "0 auto",
        direction: "rtl",
      }}
    >
      {/* فلتر جانبي */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
          padding: "50px",
          borderRadius: "12px",
          height: "fit-content",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          position: "sticky",
          top: "20px",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>الفلاتر</h3>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2", color: "#555" }}>
          <li>الفئة</li>
          <li>السعر</li>
          <li>العروض</li>
          <li>الماركة</li>
          <li>التقييم</li>
        </ul>
      </aside>

      {/* قسم المنتجات */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.product_id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                padding: "10px",
                width: "210px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: "430px",
                cursor: "default",
                position: "relative",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* زر الإعجاب فوق الصورة في الزاوية اليسرى */}
              <button
                onClick={() => toggleLike(product.product_id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  background: "transparent",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: likedItems[product.product_id] ? "red" : "#ccc",
                  userSelect: "none",
                  zIndex: 2,
                }}
                aria-label={likedItems[product.product_id] ? "إلغاء الإعجاب" : "أعجبني"}
                title={likedItems[product.product_id] ? "إلغاء الإعجاب" : "أعجبني"}
              >
                {likedItems[product.product_id] ? "❤️" : "🤍"}
              </button>

              {/* زر السلة فوق الصورة في الزاوية اليمنى */}
              <button
                onClick={() => addToCart(product)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#0a74da",
                  border: "none",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "22px",
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s ease",
                  zIndex: 2,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#095bb5")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0a74da")}
                aria-label="أضف إلى السلة"
                title="أضف إلى السلة"
              >
                🛒
              </button>

              <Link
                href={`/category/home/${product.product_id}`}
                style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
              >
                <img
                  src={product.image_url}
                  alt={product.nameproducts}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1px",
                    userSelect: "none",
                  }}
                  draggable={false}
                />
              </Link>

              <h2
                style={{
                  color: "#222",
                  fontSize: "20px",
                  marginBottom: "1px",
                  minHeight: "48px",
                  textAlign: "right",
                }}
              >
                {product.nameproducts ?? "بدون اسم"}
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  height: "130px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: "5px",
                  textAlign: "right",
                }}
              >
                {product.description_d ?? "لا يوجد وصف"}
              </p>
              <div style={{ marginBottom: "1px", textAlign: "right" }}>
                {product.old_price ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#999",
                        marginRight: "1px",
                        fontSize: "14px",
                     
                      }}
                    >
                      {product.old_price} ر.س
                    </span>
                    <span
                      style={{
                        color: "#e53935",
                        fontWeight: "bold",
                        fontSize: "18px",
                       
                      }}
                    >
                      {product.price} ر.س
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      color: "#222",
                      fontWeight: "bold",
                      fontSize: "18px",
                      
                    }}
                  >
                    {product.price ?? "غير متوفر"} ر.س
                  </span>
                )}
              </div>
              {product.rating && (
                <div style={{ marginBottom: "10px", fontSize: "18px", textAlign: "right" }}>
                  {renderStars(product.rating)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* إشعارات التوست */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#333",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 2000,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
