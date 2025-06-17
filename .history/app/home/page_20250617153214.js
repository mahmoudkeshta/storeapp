"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function PostPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const debounceTimeout = useRef(null);

  // جلب المنتجات عند التحميل
  useEffect(() => {
    fetch("https://codeeio.com/ecommerc/Products/view.php")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data || []);
        setFilteredProducts(result.data || []);
      });
  }, []);

  // فلترة البحث مع debounce (تأخير)
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const filtered = products.filter((p) =>
        p.nameproducts.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300); // 300ms تأخير
  }, [searchTerm, products]);

  // Toast لإظهار رسالة لفترة قصيرة
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  // إضافة منتج للسلة (يمكن تعديله ليتصل بالـ backend أو Context)
  const addToCart = (product) => {
    showToast(`تم إضافة المنتج: ${product.nameproducts} إلى السلة!`);
  };

  // دالة لرسم تقييم النجوم
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={"full" + i} style={{ color: "#f5a623" }}>★</span>
      );
    }
    if (halfStar) {
      stars.push(
        <span key="half" style={{ color: "#f5a623" }}>☆</span>
      );
    }
    while (stars.length < 5) {
      stars.push(
        <span key={"empty" + stars.length} style={{ color: "#ccc" }}>★</span>
      );
    }
    return stars;
  };

  return (
    <div
      style={{
        maxWidth: "1900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
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

      {/* قائمة المنتجات */}
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
              padding: "20px",
              width: "260px",
              textAlign: "center",
              transition: "transform 0.3s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "420px",
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
                  marginBottom: "15px",
                  userSelect: "none",
                }}
                draggable={false}
              />
              <h2
                style={{
                  color: "#222",
                  fontSize: "20px",
                  marginBottom: "8px",
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
                  marginBottom: "15px",
                }}
              >
                {product.description_d ?? "لا يوجد وصف"}
              </p>
              {/* عرض السعر مع السعر القديم إذا متوفر */}
              <div style={{ marginBottom: "12px" }}>
                {product.old_price ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#999",
                        marginRight: "8px",
                        fontSize: "14px",
                      }}
                    >
                      {product.old_price} ر.س
                    </span>
                    <span
                      style={{ color: "#e53935", fontWeight: "bold", fontSize: "18px" }}
                    >
                      {product.price} ر.س
                    </span>
                  </>
                ) : (
                  <span
                    style={{ color: "#222", fontWeight: "bold", fontSize: "18px" }}
                  >
                    {product.price ?? "غير متوفر"} ر.س
                  </span>
                )}
              </div>

              {/* تقييم النجوم لو موجود */}
              {product.rating ? (
                <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                  {renderStars(product.rating)}
                </div>
              ) : null}
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
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#095bb5")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0a74da")}
            >
              أضف إلى السلة
            </button>
          </div>
        ))}
      </div>

      {/* Toast Message */}
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
