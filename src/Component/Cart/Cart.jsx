import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import Loading from "../Loading/Loading";
import { nostify } from "../Utile/notify";

export default function Cart() {
  let { getCart, deleteProduct } = useContext(StoreContext);
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

  async function deleteProducts(productId) {
    try {
      let response = await deleteProduct(productId);
      setCart(response.data.products);
      setPriceTotal(response.data.totalCartPrice);
      nostify("Product Deleted", "error");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    cartProductDetailes();
  }, []);

  return (
    <>
      {cart.length != 0 ? (
        <div className="container py-5 cart">
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
                  className="cart-item d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3 p-3 rounded-4"
                >
                  {/* Left */}
                  <div className="d-flex align-items-center gap-3 flex-grow-1">
                    <img
                      src={item.product.imageCover}
                      alt=""
                      className="cart-img"
                    />

                    <div>
                      <h6>{item.product.title}</h6>

                      <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                        {item.price} EGP
                      </span>

                      {/* 👇 delete under price */}
                      <div className="mt-2">
                        <button
                          className="cart-delete-btn bob-hover"
                          onClick={() => deleteProducts(item.product._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="cart-qty mt-3 mt-md-0">
                    <button className="qty-btn">+</button>
                    <span>{item.count}</span>
                    <button className="qty-btn">-</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
