"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function PostPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const debounceTimeout = useRef(null);

  useEffect(() => {
    fetch("https://codeeio.com/ecommerc/Products/view.php")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data || []);
        setFilteredProducts(result.data || []);
      });
  }, []);

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

  const addToCart = (product) => {
    showToast(`تم إضافة المنتج: ${product.nameproducts} إلى السلة!`);
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
        flexDirection: "row-reverse",
        gap: "30px",
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
        direction: "rtl",
      }}
    >
      {/* ✅ الشريط الجانبي */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#fff",
          borderLeft: "1px solid #ddd",
          padding: "20px",
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

      {/* ✅ محتوى الصفحة */}
      <div style={{ flex: 1 }}>
        <h1
          style={{
            marginBottom: "20px",
            fontSize: "32px",
            textAlign: "center",
            color: "#222",
            fontWeight: "bold",
          }}
        >
          متجر المنتجات الفخم
        </h1>

        {/* شريط البحث */}
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "60%",
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "30px",
              border: "2px solid #ddd",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              outline: "none",
              transition: "0.3s",
            }}
          />
        </div>

        {/* المنتجات */}
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
                transition: "transform 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "400px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Link
                href={`/home/${product.product_id}`}
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

      {/* Toast */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#333",
            color: "white",
            padding: "14px 24px",
            borderRadius: "30px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            fontWeight: "bold",
            zIndex: 1000,
            opacity: 0.9,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
