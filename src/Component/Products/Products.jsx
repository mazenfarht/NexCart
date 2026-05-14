import React, { useEffect, useState } from "react";
import { baseUrl } from "../Utile/baseUrl.js";
import Product from "../Product/Product.jsx";
import axios from "axios";
import Loading from "../Loading/Loading.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    let { data } = await axios.get(`${baseUrl}/products`);
    // console.log(data.data);
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="container">
        {products.length !== 0 ? (
          <div className="row">{<Product product={products} />}</div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
