'use client';

import { useState } from 'react';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1); // الكمية
  const [loading, setLoading] = useState(true);

  const productid = params.id;

  // جلب البيانات
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://codeeio.com/ecommerc/Products/m.php/${productid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productid }),
          next: { revalidate: 60 },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setProduct(result.data?.[0]);
      } else {
        setProduct(null);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productid]);

  if (loading) return <p>جاري تحميل المنتج...</p>;
  if (!product) return <p>لم يتم العثور على المنتج.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{product.nameproducts ?? 'اسم المنتج غير متوفر'}</h1>
      <img src={product.image_url} alt="Product" width={300} />
      <p style={{ marginTop: '1rem' }}>{product.description_d}</p>

      {/* الكمية */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        <button onClick={() => setCount((prev) => Math.max(prev - 1, 1))}>-</button>
        <span style={{ margin: '0 1rem' }}>{count}</span>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>

      {/* زر إضافة إلى السلة */}
      <button
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#1e40af',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => {
          // هنا تضيف المنتج إلى السلة - احفظه في localStorage أو استخدم Zustand أو Context
          alert(`تمت إضافة ${count} من المنتج إلى السلة.`);
        }}
      >
        إضافة إلى السلة
      </button>
    </div>
  );
}
