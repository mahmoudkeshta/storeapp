
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>قائمة المنتجات</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .products {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }

    .product-card {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      width: 260px;
      padding: 15px;
      text-align: center;
      transition: 0.3s;
      cursor: pointer;
    }

    .product-card:hover {
      transform: scale(1.05);
    }

    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }

    .product-card h2 {
      font-size: 18px;
      margin: 10px 0;
      color: #222;
    }

    .product-card p {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
  </style>
</head>
<body>

  <h1>قائمة المنتجات</h1>
  <div class="products" id="products"></div>

  <script>
    async function loadProducts() {
      try {
        const response = await fetch("https://codeeio.com/ecommerc/Products/view.php");
        const data = await response.json();
        const products = data.data || [];

        const container = document.getElementById("products");

        products.forEach((product) => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${product.image_url}" alt="${product.nameproducts}" />
            <h2>${product.nameproducts ?? "بدون اسم"}</h2>
            <p>${product.description_d ?? "بدون وصف"}</p>
          `;

          card.onclick = () => {
            window.location.href = `/home/${product.product_id}`;
          };

          container.appendChild(card);
        });

      } catch (error) {
        console.error("فشل في جلب المنتجات:", error);
      }
    }

    loadProducts();
  </script>

</body>
</html>
