"use client"; // مهم لتفعيل React client component

import Link from "next/link";
import { useState, useEffect } from "react";

export default function PostPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); // كائن: productId => كمية

  // جلب المنتجات من API
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://codeeio.com/ecommerc/Products/view.php");
      const data = await res.json();
      setProducts(data.data || []);
    }
    fetchProducts();
  }, []);

  // إضافة منتج للسلة
  function addToCart(productId) {
    setCart((prev) => ({
      ...prev,
      [productId]: prev[productId] ? prev[productId] + 1 : 1,
    }));
  }

  // إزالة منتج من السلة
  function removeFromCart(productId) {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  }

  // حساب عدد أصناف السلة
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "10px" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "28px", textAlign: "center" }}>
        قائمة المنتجات
      </h1>

      {/* عرض السلة بشكل مبسط */}
      <div style={{ marginBottom: "40px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
        <h2>السلة ({cartCount} منتجات)</h2>
        {cartCount === 0 && <p>السلة فارغة</p>}
        {Object.entries(cart).map(([id, qty]) => {
          const prod = products.find((p) => p.product_id == id);
          if (!prod) return null;
          return (
            <div key={id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>{prod.nameproducts} × {qty}</span>
              <button onClick={() => removeFromCart(id)} style={{ cursor: "pointer" }}>حذف</button>
            </div>
          );
        })}
      </div>

      {/* عرض المنتجات */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {products.map((product) => (
          <div
            key={product.product_id}
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "15px",
              width: "250px",
              textAlign: "center",
              cursor: "default",
            }}
          >
            <Link href={`/home/${product.product_id}`}>
              <a>
                <img
                  src={product.image_url}
                  alt={product.nameproducts}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <h2 style={{ margin: "10px 0 10px", color: "#333" }}>
                  {product.nameproducts ?? "بدون اسم"}
                </h2>
              </a>
            </Link>
            <p style={{ color: "#666", fontSize: "14px" }}>{product.description_d}</p>
            <button
              onClick={() => addToCart(product.product_id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              أضف إلى السلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
