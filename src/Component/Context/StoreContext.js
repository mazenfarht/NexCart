import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Utile/baseUrl";

export let StoreContext = createContext();

export default function StoreContextProvider({ children }) {
  let [cartCount, setcartCount] = useState(0);
  //function is send data in product and save in localstorage
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
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <StoreContext.Provider
        value={{ changeCart, getCart, cartCount, deleteProduct }}
      >
        {children}
      </StoreContext.Provider>
    </>
  );
}
