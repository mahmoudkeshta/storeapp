'use client';

import React, { useEffect, useState } from 'react';

export default function PostPage({ params }) {
  const [products, setProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [message, setMessage] = useState('');

  // استخراج الـ id من params
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    // جلب بيانات المنتج الرئيسي
    const fetchProduct = async () => {
      const response = await fetch(`https://codeeio.com/ecommerc/Products/m.php/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        console.error('فشل في جلب بيانات المنتج');
        return;
      }

      const result = await response.json();
      setProducts(result.data || []);
    };

    // جلب المنتجات المشابهة
    const fetchSimilarProducts = async () => {
      const response = await fetch('https://codeeio.com/ecommerc/Products/view.php', {
        method: 'GET',
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        console.error('فشل في جلب المنتجات المشابهة');
        return;
      }

      const result = await response.json();
      setSimilarProducts(result.data || []);
    };

    fetchProduct();
    fetchSimilarProducts();
  }, [id]);

  const handleAddToCart = (productName) => {
    setMessage(`تمت إضافة "${productName}" إلى السلة ✅`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ /* ...styles كما في كودك السابق... */ }}>
      {/* ...كود العرض الخاص بك ... */}
    </div>
  );
}
