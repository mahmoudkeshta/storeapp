"use client"; // مهم لأن هذا الكود يستخدم أحداث

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const [id, setId] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      router.push(`/home/${id}`); // يذهب للصفحة
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Product ID:</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ادخل رقم المنتج"
      />
      <button type="submit">عرض المنتج</button>
    </form>
  );
}
