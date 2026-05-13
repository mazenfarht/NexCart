import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";

export default function Cart() {
  let { getCart } = useContext(CartContext);
  let [cart, setCart] = useState([]);
  let [priceTotal, setPriceTotal] = useState([]);

  async function cartProductDetailes() {
    try {
      let response = await getCart();
      console.log(response);

      setCart(response.data.products);
      setPriceTotal(response.data.totalCartPrice);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    cartProductDetailes();
  }, []);

  return (
    <div className="container py-5">
      <div
        className="p-4 rounded-4"
        style={{
          background: "#0f172a",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 style={{ color: "#e2e8f0" }}>Shopping Cart</h3>

          <span
            style={{
              background: "#1e293b",
              color: "#38bdf8",
              padding: "8px 16px",
              borderRadius: "999px",
              fontSize: "14px",
            }}
          >
            Total: {priceTotal} EGP
          </span>
        </div>

        {/* Items */}
        {cart.map((item) => {
          return (
            <div
              key={item._id}
              className="d-flex align-items-center justify-content-between mb-3 p-3 rounded-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Left */}
              <div className="d-flex align-items-center gap-3">
                <img
                  src={item.product.imageCover}
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />

                <div>
                  <h6
                    style={{
                      color: "#f1f5f9",
                      marginBottom: "5px",
                    }}
                  >
                    {item.product.title}
                  </h6>

                  <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                    {item.price} EGP
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
