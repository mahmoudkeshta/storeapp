import { useState } from "react";

export async function getServerSideProps() {
  try {
    const res = await fetch("https://codeeio.com/ecommerc/categories.php");
    const data = await res.json();

    // بناء على شكل الرد، نفترض أن الأقسام تحت المفتاح categories أو data
    const categories = data.categories || data.data || [];

    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.error("خطأ في جلب البيانات:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
}

const carouselItems = [
  {
    id: 1,
    image: "https://picsum.photos/id/1015/600/300",
    text: "إعلان رقم 1",
  },
  {
    id: 2,
    image: "https://picsum.photos/id/1016/600/300",
    text: "إعلان رقم 2",
  },
  {
    id: 3,
    image: "https://picsum.photos/id/1018/600/300",
    text: "إعلان رقم 3",
  },
];

export default function Home({ categories }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  return (
    <div
      style={{
        direction: "rtl",
        textAlign: "center",
        padding: 20,
        fontFamily: "Arial",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1>إعلان صور متحرك مع أقسام</h1>

      {/* Carousel */}
      <div
        style={{
          width: "80%",
          maxWidth: 600,
          margin: "20px auto",
          position: "relative",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <img
          src={carouselItems[currentIndex].image}
          alt={`صورة ${currentIndex + 1}`}
          style={{ width: "100%", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 15,
            right: 15,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: 5,
            fontSize: 18,
          }}
        >
          {carouselItems[currentIndex].text}
        </div>
      </div>

      <button
        onClick={handleNext}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
          borderRadius: 5,
          marginBottom: 40,
        }}
      >
        التالي ▶
      </button>

      {/* Sections from API */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        {categories.length === 0 && <p>لا توجد أقسام لعرضها.</p>}
        {categories.map((section) => (
          <div
            key={section.id || section.cat_id || section.category_id}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              width: 150,
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s",
              textAlign: "center",
              padding: 15,
            }}
            onClick={() => alert(`تم الضغط على ${section.name || section.cat_name || section.category_name}`)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={section.image || section.cat_image || section.category_image || "https://via.placeholder.com/150"}
              alt={section.name || section.cat_name || section.category_name || "قسم"}
              style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
            />
            <span style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
              {section.name || section.cat_name || section.category_name || "قسم"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
