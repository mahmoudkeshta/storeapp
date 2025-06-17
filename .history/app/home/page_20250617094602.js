// app/post/page.tsx
export default async function PostPage() {
    const response = await fetch("https://codeeio.com/ecommerc/Products/view.php", {
      next: { revalidate: 60 },
    });
  
    const result = await response.json(); // result = { status: "...", data: [...] }
  
    const project = result.data?.map((resul: 1, index: 1) => (
      <div key={index}>
        <h1>Holl</h1>
        <h2>{resul.nameproducts ?? "No products"}</h2>
        <p>{resul.description_d}</p>
        <img src={resul.image_url} alt="Product Image" width={300} />
      </div>
    ));
  
    return <div>{project}</div>;
  }
  