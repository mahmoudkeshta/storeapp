"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("https://codeeio.com/ecommerc/categories.php");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* إعلان متحرك */}
      <div className="bg-green-200 text-center p-4">
        <h2 className="text-2xl font-bold">
          احصل على 500 درهم مكافأة ترحيبية وقسيمة 300 درهم من Trip.com
        </h2>
      </div>

      {/* سلايدر الصور */}
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        className="mt-4"
      >
        <div>
          <img
            src="https://via.placeholder.com/800x300"
            alt="إعلان 1"
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/800x300"
            alt="إعلان 2"
          />
        </div>
      </Carousel>

      {/* أقسام دائرية */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-full flex flex-col items-center justify-center p-4 shadow-lg hover:shadow-xl transition"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <div className="text-lg font-medium text-center">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}