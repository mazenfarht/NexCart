import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../Utile/baseUrl.js";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categorie, sutcategorie] = useState([]);

  const getAllCategories = async () => {
    let { data } = await axios.get(`${baseUrl}/categories`);

    sutcategorie(data.data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container my-5 categories">
        <h3 className="mb-3">Shop Popular Categories</h3>

        <Slider {...settings}>
          {categorie.map((item, index) => {
            return (
              <div>
                <img
                  src={item.image}
                  key={item._id || index}
                  className="w-100 "
                  height={180}
                  alt="cate"
                />
                <Link
                  to={`/categoriesPage/${item._id}`}
                  className="text-decoration-none text-white"
                >
                  {" "}
                  <h6 className="mt-2 text-white">{item.name}</h6>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
