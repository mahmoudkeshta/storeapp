import Link from "next/link";

export default async function PostPage() {
  const response = await fetch("https://codeeio.com/ecommerc/Products/view.php", {
    next: { revalidate: 60 },
  });

  const result = await response.json(); // { status: "success", data: [...] }
  const products = result.data || [];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "5px" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "28px" }}>قائمة المنتجات</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {products.map((resul) => (
          <Link href={`/home/${resul.product_id}`} key={resul.product_id}>
            <div
              style={{
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: "15px",
                transition: "0.3s",
                cursor: "pointer",
                width: "250px",
                textAlign: "center",
              }}
            >
         
              <img
                src={resul.image_url}
                alt="Product Image"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
                   <h2 style={{ margin: "0 0 10px", fontSize: "20px", color: "#333" }}>
                {resul.nameproducts ?? "No products"}
              </h2>
              <p style={{ margin: "0 0 10px", color: "#666", fontSize: "14px" }}>
                {resul.description_d}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
