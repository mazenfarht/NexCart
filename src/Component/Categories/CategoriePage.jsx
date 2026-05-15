import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../Utile/baseUrl";
import { StoreContext } from "../Context/StoreContext";
import { nostify } from "../Utile/notify";

export default function CategoriePage() {
  let { id } = useParams();
  let [products, setProducts] = useState([]);
  let [loadingId, setLoadingId] = useState(null);
  let { changeCart } = useContext(StoreContext);

  async function addProduct(productId) {
    try {
      setLoadingId(productId);
      let response = await changeCart(productId);
      console.log("Added to cart:", response);
      nostify("Product added successfully", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  }

  const getProductsByCategory = async () => {
    try {
      let { data } = await axios.get(`${baseUrl}/products?category[in]=${id}`);

      setProducts(data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (id) getProductsByCategory();
  }, [id]);

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-capitalize">
        {products?.[0]?.category?.name || "Category Products"}
      </h2>

      <div className="row g-4">
        {products.length === 0 ? (
          <div className="text-center mt-5">
            <h4>No products in this category 😢</h4>
          </div>
        ) : (
          products.map((item) => (
            <div className="col-md-4 col-lg-3" key={item._id}>
              <div className="product h-100 p-2  rounded shadow-sm">
                <Link to={"/product-detailes/" + item._id}>
                  <img
                    src={item.imageCover}
                    className="product-img w-100"
                    alt={item.title}
                  />

                  <h6 className="my-2 text-center">{item.category?.name}</h6>

                  <p className="fw-bolder text-center">
                    {item.title.split(" ").slice(0, 3).join(" ")}
                  </p>
                </Link>

                <div className="d-flex justify-content-center align-items-center my-3">
                  <span className="me-3">{item.price} EGP</span>

                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    <span>{item.ratingsAverage}</span>
                  </div>
                </div>

                <button
                  onClick={() => addProduct(item._id)}
                  className=" btn bg-main  text-white w-50 my-3"
                  disabled={loadingId === item._id}
                >
                  {loadingId === item._id ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-2"></i>
                      Adding...
                    </>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
