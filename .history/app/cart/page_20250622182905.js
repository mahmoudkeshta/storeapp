"use client";

import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchCartItems(storedUserId);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const fetchCartItems = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch("https://codeeio.com/ecommerc/cart/viewcart.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id: userId }).toString(),
      });
      if (!response.ok) throw new Error("فشل تحميل السلة");
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setCartItems(data.data);
      } else {
        setCartItems([]);
        showToast(data.message || "لا توجد عناصر في السلة");
      }
    } catch (err) {
      setCartItems([]);
      showToast("حدث خطأ أثناء جلب السلة");
      console.error(err);
    }
    setLoading(false);
  };

  const updateQuantity = (orderItemId, newQuantity) => {
    if (newQuantity < 1) return; // منع الكمية أقل من 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.order_item_id === orderItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(10);
      showToast("تم تطبيق الكوبون بنجاح! خصم 10% مضاف.");
    } else {
      showToast("كوبون غير صالح!");
    }
  };

  const deleteCartItem = async (orderItemId) => {
    if (!userId) return;
    try {
      const response = await fetch("https://codeeio.com/ecommerc/cart/deletecartitem.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ order_item_id: orderItemId, user_id: userId }).toString(),
      });
      const data = await response.json();
      if (data.status === "success") {
        showToast("تم حذف المنتج من السلة");
        setCartItems((prev) => prev.filter((item) => item.order_item_id !== orderItemId));
      } else {
        showToast(data.message || "فشل حذف المنتج");
      }
    } catch (err) {
      showToast("حدث خطأ أثناء حذف المنتج");
      console.error(err);
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    return (total * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="container my-4" style={{ direction: "rtl" }}>
      <div className="row">
        {/* قائمة المنتجات */}
        <div className="col-lg-8 mb-4">
          <h1 className="text-center mb-4 text-warning">عربة التسوق</h1>
          {loading ? (
            <p className="text-center text-muted">جاري التحميل...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-muted">سلة المشتريات فارغة</p>
          ) : (
            <div className="list-group">
              {cartItems.map((item) => (
                <div
                  key={item.order_item_id}
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded shadow-sm mb-3"
                  style={{ backgroundColor: "#fff" }}
                >
                  <div className="d-flex align-items-center" style={{ gap: "15px" }}>
                    <img
                      src={item.image_url || "/placeholder.png"}
                      alt={item.nameproducts}
                      className="img-thumbnail"
                      style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 10 }}
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                    <div>
                      <h5 className="mb-1">{item.nameproducts}</h5>
                      <p className="mb-1 text-secondary">
                        السعر: {parseFloat(item.price).toFixed(2)} ر.س
                      </p>
                      <div className="btn-group" role="group" aria-label="Quantity controls">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.order_item_id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <button type="button" className="btn btn-light" disabled>
                          {item.quantity}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.order_item_id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteCartItem(item.order_item_id)}
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ملخص الطلب */}
        <div className="col-lg-4">
          <div className="card shadow-sm p-3">
            <h2 className="mb-4">ملخص الطلب</h2>
            <div className="mb-3">
              <label htmlFor="couponInput" className="form-label">
                إدخال كوبون:
              </label>
              <div className="input-group">
                <input
                  id="couponInput"
                  type="text"
                  className="form-control"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="أدخل الكوبون"
                />
                <button className="btn btn-primary" onClick={applyCoupon}>
                  تطبيق
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label>إجمالي السعر:</label>
              <p className="fw-bold fs-5">{calculateTotal()} ر.س</p>
            </div>
            <button className="btn btn-primary w-100 fw-bold fs-5">إتمام الطلب</button>
          </div>
        </div>
      </div>

      {/* رسالة توست */}
      {toastMessage && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 1055 }}
        >
          <div className="toast-header">
            <strong className="me-auto">تنبيه</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setToastMessage("")}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      )}
    </div>
  );
}
