// app/post/page.tsx
export default async function PostPage() {
    const response = await fetch("https://codeeio.com/ecommerc/Products/view.php", {
      next: { revalidate: 60 },
      //cache: "force-cache",
    });
  
    const result = await response.json(); // يحتوي على {status, data: [...]}
  
    const project= result.map((result)=>
    {
        return (
            <div>
              <h1>Holl</h1>
              <h2>{result.nameproducts ?? "No products"}</h2>
              <p>{result.description_d}</p>
              <img src={result.image_url} alt="Product Image" width={300} />
            </div>
          );
    });

    return (
    <div>{project}</div>
    );
 
  }
  