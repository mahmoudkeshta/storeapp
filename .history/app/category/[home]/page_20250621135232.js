"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { use } from "react";

export default function PostPage({ params }) {
  const { home: project1 } = use(params);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const debounceTimeout = useRef(null);
  const [cartItems, setCartItems] = useState([]);

  // معرف المستخدم - يمكنك تغييره حسب النظام أو جلبه من الجلسة
  const userId = "8"; // مثال ثابت - استبدله بالديناميكي

  useEffect(() => {
    fetch(`https://codeeio.com/ecommerc/categories/web.php/${project1}`)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data || []);
        setFilteredProducts(result.data || []);
      });
  }, [project1]);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const filtered = products.filter((p) =>
        p.nameproducts.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300);
  }, [searchTerm, products]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  // دالة لإرسال بيانات المنتج للسلة إلى السيرفر
  const sendCartToServer = async ({ product_id, quantity, price }) => {
    const total_amount = quantity * price;
    const status = "pending"; // يمكنك تعديل الحالة حسب منطقك

    try {
      const response = await fetch("https://codeeio.com/ecommerc/cart/cart.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({
          user_id: userId,
          product_id,
          quantity,
          price,
          total_amount,
          status,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        showToast("تم إضافة المنتج إلى السلة بنجاح!");
        return true;
      } else {
        showToast(`خطأ: ${data.message || "لم يتم الإضافة"}`);
        return false;
      }
    } catch (error) {
      showToast("حدث خطأ أثناء الإضافة للسلة");
      return false;
    }
  };

  const addToCart = async (product) => {
    // هنا كمية المنتج تساوي 1 بشكل افتراضي، يمكن تعديلها حسب حاجتك
    const quantity = 1;
    const price = product.price || 0;

    // أرسل بيانات للسيرفر
    const success = await sendCartToServer({
      product_id: product.product_id,
      quantity,
      price,
    });

    if (success) {
      setCartItems((prev) => [...prev, { ...product, quantity }]);
    }
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
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "400px",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
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
                    marginBottom: "5px",
                    userSelect: "none",
                  }}
                  draggable={false}
                />
                <h2
                  style={{
                    color: "#222",
                    fontSize: "20px",
                    marginBottom: "5px",
                    minHeight: "48px",
                  }}
                >
                  {product.nameproducts ?? "بدون اسم"}
                </h2>
                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    height: "60px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "5px",
                  }}
                >
                  {product.description_d ?? "لا يوجد وصف"}
                </p>
                <div style={{ marginBottom: "12px" }}>
                  {product.old_price ? (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#999",
                          marginRight: "5px",
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
                  <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                    {renderStars(product.rating)}
                  </div>
                )}
              </Link>
              <button
                onClick={() => addToCart(product)}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#0a74da",
                  border: "none",
                  borderRadius: "30px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "15px",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background-color 0.3s ease",
                  marginTop: "auto",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#095bb5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0a74da")
                }
              >
                أضف إلى السلة
              </button>
            </div>
          ))}
        </div>
      </div>

      <aside
        style={{
          width: cartOpen ? "300px" : "0",
          backgroundColor: "#fff",
          borderLeft: cartOpen ? "1px solid #ddd" : "none",
          padding: cartOpen ? "20px" : "0",
          borderRadius: "12px",
          boxShadow: cartOpen ? "0 0 10px rgba(0,0,0,0.05)" : "none",
          height: "fit-content",
          position: "sticky",
          top: "20px",
          overflowY: "auto",
          transition:
            "width 0.3s ease, padding 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
          direction: "rtl",
          whiteSpace: "normal",
        }}
      >
        {cartOpen ? (
          <>
            <h3 style={{ marginBottom: "1rem", color: "#333" }}>عربة التسوق</h3>
            {cartItems.length === 0 ? (
              <p>السلة فارغة</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, color: "#555" }}>
                {cartItems.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      marginBottom: "10px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "10px",
                    }}
                  >
                    <strong>{item.nameproducts}</strong>
                    <br />
                    السعر: {item.price} ر.س
                    <br />
                    الكمية: {item.quantity}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </aside>

      <button
        onClick={() => setCartOpen(!cartOpen)}
        style={{
          position: "fixed",
          top: "90px",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "#0a74da",
          border: "none",
          borderRadius: "50%",
          color: "white",
          width: "48px",
          height: "48px",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#095bb5")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0a74da")}
        aria-label="Toggle cart sidebar"
      >
        🛒
      </button>

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
