import axios from "axios";
import React, { createContext } from "react";
import { baseUrl } from "./../Utile/baseUrl";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  function changeCart(productId) {
    let token = localStorage.getItem("token");
    return axios
      .post(
        `${baseUrl}/cart`,
        { productId },
        {
          headers: { token: token },
        }
      )
      .then((res) => res.data)
      .catch((error) => error);
  }
  function getCart() {
    let token = localStorage.getItem("token");

    return axios
      .get(`${baseUrl}/cart`, {
        headers: { token },
      })
      .then((res) => res.data)
      .catch((error) => error);
  }
  return (
    <>
      <CartContext.Provider value={{ changeCart, getCart }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
