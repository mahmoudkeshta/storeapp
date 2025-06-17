// app/post/page.tsx
export default async function PostPage() {
    const response = await fetch("https://codeeio.com/ecommerc/Products/view.php", {
      next: { revalidate: 60 },
      cache: "force-cache",
    });
  
    const result = await response.json(); // يحتوي على {status, data: [...]}
    const product = result.data?.[0];
  
    return (
      <div>
        <h1>Holl</h1>
        <h2>{product?.nameproducts ?? "No products"}</h2>
        <p>{product?.description_d}</p>
        <img src={product?.image_url} alt="Product Image" width={300} />
      </div>
    );
  }
  