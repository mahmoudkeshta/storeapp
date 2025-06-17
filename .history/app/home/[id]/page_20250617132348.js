// app/home/[id]/page.jsx أو app/post/[id]/page.jsx

export default async function PostPage1({ params }) {
  const projectid = params.id;

  const response = await fetch(`https://codeeio.com/ecommerc/Products/details.php?id=${projectid}`, {
    next: { revalidate: 60 },
  });

  const result = await response.json(); // { status: "success", data: [...] }
  const products = result.data || [];

  return (
    <div>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((resul, index) => (
          <div key={index}>
            <h1>Holl</h1>
            <h2>{resul.nameproducts ?? "No products"}</h2>
            <p>{resul.description_d}</p>
            <img src={resul.image_url} alt="Product Image" width={300} />
          </div>
        ))
      )}
    </div>
  );
}
