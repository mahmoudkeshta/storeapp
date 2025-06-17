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
    throw new Error('Failed to fetch product data');
  }

  const result = await response.json();
  const products = result.data || [];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem',
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
            }}>
              {resul.description_d ?? 'لا يوجد وصف لهذا المنتج'}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
