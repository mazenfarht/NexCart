import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Utile/baseUrl";

export let StoreContext = createContext();

export default function StoreContextProvider({ children }) {
  let [cartCount, setcartCount] = useState(0);
  let [cartId, setCartId] = useState(null);

  //function is send data in product and save in localstorage
  function changeCart(productId) {
    let token = localStorage.getItem("token");
    return axios
      .post(
        `${baseUrl}/cart`,
        { productId },
        {
          headers: { token },
        }
      )
      .then((res) => {
        setcartCount(res.data.numOfCartItems);
        return res.data;
      })
      .catch((error) => error);
  }

  //function is getCart item ande save it
  function getCart() {
    let token = localStorage.getItem("token");

    return axios
      .get(`${baseUrl}/cart`, {
        headers: { token },
      })
      .then((res) => {
        setcartCount(res.data.numOfCartItems);
        setCartId(res.data.data._id);
        return res.data;
      })
      .catch((error) => error);
  }

  function deleteProduct(productId) {
    let token = localStorage.getItem("token");
    return axios
      .delete(`${baseUrl}/cart/${productId}`, { headers: { token } })
      .then((res) => res.data)
      .catch((error) => error);
  }

  function updateQty(productId, count) {
    let token = localStorage.getItem("token");
    return axios
      .put(
        `${baseUrl}/cart/${productId}`,
        { count },
        {
          headers: { token },
        }
      )
      .then((res) => res.data)
      .catch((error) => error);
  }

  function onlinePayment(cartId, shippingAddress) {
    let token = localStorage.getItem("token");
    return axios
      .post(
        `${baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress: shippingAddress },
        {
          headers: { token },
        }
      )
      .then((res) => res.data)
      .catch((error) => error);
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <StoreContext.Provider
        value={{
          changeCart,
          getCart,
          cartCount,
          deleteProduct,
          onlinePayment,
          updateQty,
          cartId,
        }}
      >
        {children}
      </StoreContext.Provider>
    </>
  );
}
