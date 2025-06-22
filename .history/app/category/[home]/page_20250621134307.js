"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const debounceTimeout = useRef(null);

  // Fetch products from API
  useEffect(() => {
    fetch("https://codeeio.com/ecommerc/categories/web.php")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data || []);
        setFilteredProducts(result.data || []);
      });
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.nameproducts.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300);
  }, [searchTerm, products]);

  // Show toast message
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Add product to cart
  const addToCart = async (product) => {
    try {
      setCartItems((prev) => [...prev, product]);
      showToast(`تم إضافة المنتج: ${product.nameproducts} إلى السلة!`);

      const formData = new URLSearchParams();
      formData.append("user_id", 1); // Replace with actual user ID
      formData.append("total_amount", product.price * product.quantity);
      formData.append("status", "pending");
      formData.append("product_id", product.id);
      formData.append("quantity", product.quantity);
      formData.append("price", product.price);

      const response = await fetch("https://codeeio.com/ecommerc/cart/cart.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error("فشل إضافة المنتج إلى السلة.");
      }

      const data = await response.json();
      console.log("تمت إضافة المنتج:", data);
    } catch (error) {
      console.error(error.message);
      showToast("حدث خطأ أثناء إضافة المنتج إلى السلة.");
    }
  };

  // Render stars for product rating
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
    <div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "2px", maxWidth: "1200px", margin: "0 auto", direction: "rtl" }}>
      {/* Sidebar filters */}
      <aside style={{ width: "250px", backgroundColor: "#fff", borderRight: "1px solid #ddd", padding: "20px", borderRadius: "12px", height: "fit-content", position: "sticky", top: "20px" }}>
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>الفلاتر</h3>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2", color: "#555" }}>
          <li>الفئة</li>
          <li>السعر</li>
          <li>العروض</li>
          <li>الماركة</li>
          <li>التقييم</li>
        </ul>
      </aside>

      {/* Product content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
          {filteredProducts.map((product) => (
            <div key={product.product_id} style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.12)", padding: "10px", width: "210px", textAlign: "center", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "400px" }}>
              <Link href={`/category/home/${product.product_id}`} style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}>
                <img src={product.image_url} alt={product.nameproducts} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px", marginBottom: "5px" }} />
                <h2 style={{ color: "#222", fontSize: "20px", marginBottom: "5px" }}>{product.nameproducts ?? "بدون اسم"}</h2>
                <p style={{ color: "#666", fontSize: "14px", height: "60px", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "5px" }}>{product.description_d ?? "لا يوجد وصف"}</p>
                <div style={{ marginBottom: "12px" }}>{product.rating && renderStars(product.rating)}</div>
              </Link>
              <button onClick={() => addToCart(product)} style={{ padding: "10px 15px", backgroundColor: "#0a74da", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>أضف إلى السلة</button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart sidebar */}
      {cartOpen && (
        <aside style={{ width: "300px", backgroundColor: "#fff", borderLeft: "1px solid #ddd", padding: "20px", borderRadius: "12px", height: "fit-content", position: "sticky", top: "20px", overflowY: "auto" }}>
          <h3 style={{ marginBottom: "1rem", color: "#333" }}>عربة التسوق</h3>
          {cartItems.length === 0 ? <p>السلة فارغة</p> : (
            <ul style={{ listStyle: "none", padding: 0, color: "#555" }}>
              {cartItems.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                  <strong>{item.nameproducts}</strong><br />
                  السعر: {item.price} ر.س
                </li>
              ))}
            </ul>
          )}
        </aside>
      )}

      <button onClick={() => setCartOpen(!cartOpen)} style={{ position: "fixed", top: "90px", right: "10px", zIndex: 1000, backgroundColor: "#0a74da", border: "none", borderRadius: "50%", color: "white", width: "48px", height: "48px", fontSize: "24px", cursor: "pointer" }}>🛒</button>

      {toastMessage && <div style={{ position: "fixed", bottom: "20px", right: "20px", backgroundColor: "#333", color: "white", padding: "10px", borderRadius: "8px", zIndex: 1000 }}>{toastMessage}</div>}
    </div>
  );
}
