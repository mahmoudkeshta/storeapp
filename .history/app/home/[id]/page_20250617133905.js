// app/home/[id]/page.jsx أو app/post/[id]/page.jsx
export default async function PostPage({ params }) {
  const projectid = params.id;

  const response = await fetch("https://codeeio.com/ecommerc/Products/details.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: projectid }),
    next: { revalidate: 60 }, // إعادة التحديث كل 60 ثانية
  });

  if (!response.ok) {
    throw new Error("فشل في جلب بيانات المنتج");
  }

  const result = await response.json();
  const products = result.data || [];

  return (
    <div>
      {products.length === 0 ? (
        <p>لا توجد منتجات</p>
      ) : (
        products.map((resul, index) => (
          <div key={index}>
            <h1>{resul.nameproducts ?? "منتج غير معروف"}</h1>
            <p>{resul.description_d}</p>
            <img src={resul.image_url} alt="صورة المنتج" width={300} />
          </div>
        ))
      )}
    </div>
  );
}
