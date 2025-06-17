"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PostPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // جلب المنتجات عند التحميل
  useEffect(() => {
    fetch("https://codeeio.com/ecommerc/Products/view.php")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data || []);
        setFilteredProducts(result.data || []);
      });
  }, []);

  // تحديث الفلترة عند تغير البحث
  useEffect(() => {
    const filtered = products.filter((p) =>
      p.nameproducts.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // إضافة منتج للسلة (يمكن تعديله ليتصل بالـ backend أو Context)
  const addToCart = (product) => {
    alert(`تم إضافة المنتج: ${product.nameproducts} إلى السلة!`);
    // هنا ممكن تضيف منطق لتحديث السلة
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "32px", textAlign: "center", color: "#222", fontWeight: "bold" }}>
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Link href={`/home/${product.product_id}`} style={{ textDecoration: "none" }}>
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
              <h2 style={{ color: "#222", fontSize: "20px", marginBottom: "8px" }}>
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
            </Link>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: "10px 18px",
                backgroundColor: "#0a74da",
                border: "none",
                borderRadius: "30px",
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                width: "100%",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#095bb5")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0a74da")}
            >
              أضف إلى السلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
