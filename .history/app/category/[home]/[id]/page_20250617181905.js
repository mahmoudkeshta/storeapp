export default async function PostPage({ params }) {
  const projectid = params.id;

  const response = await fetch(
    `https://codeeio.com/ecommerc/Products/m.php/${projectid}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: projectid }),
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error('فشل في جلب بيانات المنتج');
  }

  const result = await response.json();
  const products = result.data || [];

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
      {products.length === 0 ? (
        <p style={{ fontSize: '1.5rem', color: '#888' }}>لا توجد منتجات.</p>
      ) : (
        products.map((resul, index) => (
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

            {/* زر الإضافة إلى السلة */}
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
              onClick={() => alert(`تمت إضافة ${resul.nameproducts} إلى السلة!`)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              🛒 أضف إلى السلة
            </button>
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
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              textAlign: 'center',
            }}>
              <div style={{
                width: '100%',
                height: '150px',
                backgroundColor: '#e5e7eb',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
              }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827' }}>
                منتج مشابه {i + 1}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>وصف مختصر للمنتج</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
