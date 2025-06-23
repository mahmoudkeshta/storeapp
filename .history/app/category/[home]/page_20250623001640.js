"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PostPage({ params }) {
  const project1 = params.home;

  const [products, setProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    if (project1) {
      fetch(`https://codeeio.com/ecommerc/categories/web.php/${project1}`)
        .then((res) => res.json())
        .then((result) => {
          setProducts(result.data || []);
        })
        .catch(() => {
          setProducts([]);
        });
    }
  }, [project1]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={"full" + i} style={{ color: "#f5a623" }}>★</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" style={{ color: "#f5a623" }}>☆</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={"empty" + stars.length} style={{ color: "#ccc" }}>★</span>);
    }
    return stars;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "2px",
        maxWidth: "2000px",
        margin: "0 auto",
        direction: "rtl",
      }}
    >
      {/* فلتر جانبي */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
          padding: "50px",
          borderRadius: "12px",
          height: "fit-content",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          position: "sticky",
          top: "20px",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>الفلاتر</h3>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2", color: "#555" }}>
          <li>الفئة</li>
          <li>السعر</li>
          <li>العروض</li>
          <li>الماركة</li>
          <li>التقييم</li>
        </ul>
      </aside>

      {/* قسم المنتجات */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {currentProducts.map((product) => (
            <div
              key={product.product_id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                padding: "10px",
                width: "210px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: "270px",
                cursor: "default",
                position: "relative",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Link
                href={`/category/home/${product.product_id}`}
                style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
              >
                <img
                  src={product.image_url}
                  alt={product.nameproducts}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1px",
                    userSelect: "none",
                  }}
                  draggable={false}
                />
              </Link>

              <h2
                style={{
                  color: "#222",
                  fontSize: "20px",
                  marginBottom: "1px",
                  minHeight: "48px",
                  textAlign: "right",
                }}
              >
                {product.nameproducts ?? "بدون اسم"}
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  height: "130px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: "5px",
                  textAlign: "right",
                }}
              >
                {product.description_d ?? "لا يوجد وصف"}
              </p>
              <div style={{ marginBottom: "1px", textAlign: "right" }}>
                {product.old_price ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#999",
                        marginRight: "8px",
                        fontSize: "14px",
                      }}
                    >
                      {product.old_price} ر.س
                    </span>
                    <span
                      style={{
                        color: "#e53935",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {product.price} ر.س
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      color: "#222",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {product.price ?? "غير متوفر"} ر.س
                  </span>
                )}
              </div>
              {product.rating && (
                <div style={{ marginBottom: "10px", fontSize: "18px", textAlign: "right" }}>
                  {renderStars(product.rating)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* أزرار الصفحات */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "30px",
              flexWrap: "wrap",
              userSelect: "none",
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              السابق
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    backgroundColor: currentPage === pageNum ? "#ffce00" : "white",
                    cursor: "pointer",
                    fontWeight: currentPage === pageNum ? "bold" : "normal",
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              التالي
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
