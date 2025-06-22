'use client';

import React, { useEffect, useState, use } from 'react';

export default function PostPage({ params }) {
  // فك وعد params
  const resolvedParams = use(params);
  const projectid = resolvedParams.id;

  const [products, setProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!projectid) return;

    // جلب بيانات المنتج الرئيسي
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://codeeio.com/ecommerc/Products/m.php/${projectid}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: projectid }),
          next: { revalidate: 1 },
        });

        if (!response.ok) {
          console.error('فشل في جلب بيانات المنتج');
          return;
        }

        const result = await response.json();
        setProducts(result.data || []);
      } catch (error) {
        console.error('خطأ في جلب بيانات المنتج:', error);
      }
    };

    // جلب المنتجات المشابهة
    const fetchSimilarProducts = async () => {
      try {
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
      } catch (error) {
        console.error('خطأ في جلب المنتجات المشابهة:', error);
      }
    };

    fetchProduct();
    fetchSimilarProducts();
  }, [projectid]);

  const handleAddToCart = (productName) => {
    setMessage(`تمت إضافة "${productName}" إلى السلة ✅`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        padding: '2rem',
        gap: '3rem',
      }}
    >
      {products.length === 0 ? (
        <p style={{ fontSize: '1.5rem', color: '#888' }}>لا توجد منتجات.</p>
      ) : (
        products.map((resul, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              maxWidth: '1000px',
              width: '100%',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            {/* صورة المنتج */}
            <div style={{ flex: '1' }}>
              <img
                src={resul.image_url}
                alt="صورة المنتج"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
              />
            </div>

            {/* تفاصيل المنتج */}
            <div style={{ flex: '1', textAlign: 'right' }}>
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: '#1f2937',
                }}
              >
                {resul.nameproducts ?? 'اسم المنتج غير متوفر'}
              </h1>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  marginBottom: '0.75rem',
                }}
              >
                بواسطة: <strong>{resul.owner_name ?? 'اسم البائع غير متوفر'}</strong>
              </p>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#f59e0b',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  direction: 'rtl',
                }}
              >
                ⭐ 4.6 <span style={{ color: '#6b7280' }}>(338 تقييم)</span>
              </p>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#4b5563',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                }}
              >
                {resul.description_d ?? 'لا يوجد وصف لهذا المنتج'}
              </p>

              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => handleAddToCart(resul.nameproducts)}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#10b981')}
              >
                🛒 أضف إلى السلة
              </button>

              {message && (
                <p style={{ marginTop: '1rem', color: '#059669', fontWeight: 'bold' }}>{message}</p>
              )}
            </div>
          </div>
        ))
      )}

      {/* منتجات مشابهة */}
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#374151',
            textAlign: 'right',
          }}
        >
          منتجات مشابهة
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {similarProducts.length === 0 ? (
            <p style={{ fontSize: '1rem', color: '#888', gridColumn: '1/-1', textAlign: 'center' }}>
              لا توجد منتجات مشابهة.
            </p>
          ) : (
            similarProducts.map((prod, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#fff',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                }}
              >
                <img
                  src={prod.image_url}
                  alt={prod.nameproducts}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                  }}
                />
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827' }}>
                  {prod.nameproducts ?? 'منتج مشابه'}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  {prod.description_d ?? 'وصف مختصر للمنتج'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
