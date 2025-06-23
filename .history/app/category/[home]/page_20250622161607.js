"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PostPage() {
  const params = useParams();
  const project1 = params?.home;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [likedItems, setLikedItems] = useState({});
  const debounceTimeout = useRef(null);
  const [cartItems, setCartItems] = useState([]);

  const storedUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const userId = storedUserId;

  useEffect(() => {
    if (project1) {
      fetch(`https://codeeio.com/ecommerc/categories/web.php/${project1}`)
        .then((res) => res.json())
        .then((result) => {
          setProducts(result.data || []);
          setFilteredProducts(result.data || []);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [project1]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

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
    <div>
      {/* باقي الكود الخاص بعرض المنتجات والتعامل مع التوست */}
    </div>
  );
}
