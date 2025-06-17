// app/post/page.jsx
import Link from "next/link";
export default async function PostPage() {
   
    const response = await fetch("https://codeeio.com/ecommerc/Products/view.php", {
      next: { revalidate: 60 },
    });
  
    const result = await response.json(); // { status: "success", data: [...] }
    const products = result.data || [];
  
    const project = products.map((resul, index) => (
        <Link href={`/home/${resul.product_id}`}>
      <div key={index}  style={{width:"100%",background:"white",paadding:"20px",color:"blue"}}>
        <h1>Holl</h1>
        <h2>{resul.nameproducts ?? "No products"}</h2>
        <p>{resul.description_d}</p>
        <img src={resul.image_url} alt="Product Image" width={300} />
      </div></Link>
    ));
  
    return <div>{project}</div>;
  }
  