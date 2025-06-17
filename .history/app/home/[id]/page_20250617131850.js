export default async function PostPage({ params }) {
  const projectid = params.id;

  const response = await fetch(
    `https://codeeio.com/ecommerc/Products/details.php?id=${projectid}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product data');
  }

  const result = await response.json();
  const products = result.data || [];

  return (
    <div>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((resul, index) => (
          <div key={index}>
            <h1>{resul.nameproducts ?? 'No products'}</h1>
            <p>{resul.description_d}</p>
            <img src={resul.image_url} alt="Product Image" width={300} />
          </div>
        ))
      )}
    </div>
  );
}
