// app/post/page.tsx أو app/post/page.jsx

export default async function PostPage() {
    const response = await fetch("https://codeeio.com/ecommerc/Products/view.php", {
      // revalidate كل 60 ثانية (ISR)
      next: {
        revalidate: 60,
      },
      // تأكد أن هذا موجود إن كان endpoint خارجي
      cache: "force-cache",
    });
  
    const data = await response.json();
  
    return (
      <div>
        <h1>Holl</h1>
        {/* عرض أول منتج إذا كان موجود */}
        <h2>{data[1]?.nameproducts ?? "No products"}</h2>
      </div>
    );
  }
  