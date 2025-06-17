// app/post/[id]/page.jsx

export default async function PostPage({ params }) {
  const projectId = params.id;

  const response = await fetch(`https://codeeio.com/ecommerc/Products/details.php?id=${projectId}`, {
    next: { revalidate: 60 },
  });

  const result = await response.json();
  const products = result.data || [];

  const project = products.map((resul, index) => (
    <div key={index}>
      <h1>Holl</h1>
      <h2>{resul.nameproducts ?? "No products"}</h2>
      <p>{resul.description_d}</p>
      <img src={resul.image_url} alt="Product Image" width={300} />
    </div>
  ));

  return <div>{project}</div>;
}
