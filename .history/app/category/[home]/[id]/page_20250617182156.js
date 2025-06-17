'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';

export default function PostPage(props) {
  const { id: projectid } = use(props.params);

  const [product, setProduct] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      // بيانات المنتج الحالي
      const res = await fetch(`https://codeeio.com/ecommerc/Products/m.php/${projectid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: projectid }),
        next: { revalidate: 60 },
      });
      const data = await res.json();
      setProduct(data.data || []);
    }

    async function fetchSimilar() {
      const res = await fetch(`https://codeeio.com/ecommerc/Products/view.php`);
      const data = await res.json();
      setSimilar(data.data || []);
    }

    fetchData();
    fetchSimilar();
  }, [projectid]);

  const handleAddToCart = (name) => {
    setMessage(`✅ تم إضافة "${name}" إلى السلة.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem',
      gap: '2rem',
    }}>
      {product.length === 0 ? (
        <p style={{ fontSize: '1.5rem', color: '#888' }}>لا توجد منتجات.</p>
      ) : (
        product.map((resul, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <img
              src={resul.image_url}
              alt="صورة المنتج"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
              }}
            />
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#1f2937',
            }}>
              {resul.nameproducts ?? 'اسم المنتج غير متوفر'}
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: '2rem',
            }}>
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
              onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              🛒 أضف إلى السلة
            </button>

            {message && (
              <p style={{ marginTop: '1rem', color: '#059669', fontWeight: 'bold' }}>{message}</p>
            )}
          </div>
        ))
      )}

      {/* منتجات مشابهة */}
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#374151',
          textAlign: 'right',
        }}>
          منتجات مشابهة
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
        }}>
          {similar.slice(0, 4).map((item, i) => (
            <div key={i} style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              textAlign: 'center',
            }}>
              <img
                src={item.image_url}
                alt={item.nameproducts}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                }}
              />
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827' }}>
                {item.nameproducts}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {item.description_d?.slice(0, 40) ?? 'لا يوجد وصف'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
