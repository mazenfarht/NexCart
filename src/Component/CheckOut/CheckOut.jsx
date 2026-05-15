import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function CheckOut() {
  let { onlinePayment, cartId } = useContext(StoreContext);

  async function onlinePaymentMethod(values) {
    try {
      let response = await onlinePayment(cartId, values);
      if (response.status === "success") {
        window.location.href = response.session.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  let checkoutValidate = Yup.object({
    detailes: Yup.string()
      .min(5, "Details must be at least 5 characters")
      .max(100, "Details must be less than 100 characters")
      .required("Address details are required"),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
      .required("Phone is required"),

    city: Yup.string()
      .min(2, "City name is too short")
      .max(50, "City name is too long")
      .required("City is required"),
  });

  let checkoutFormik = useFormik({
    initialValues: {
      detailes: "",
      phone: "",
      city: "",
    },
    validationSchema: checkoutValidate,
    onSubmit: onlinePaymentMethod,
  });
  return (
    <>
      <div className=" form w-50 m-auto my-5 ">
        <form onSubmit={checkoutFormik.handleSubmit}>
          <label htmlFor="detailes" className="text-white">
            Detailes
          </label>

          <input
            className="form-control my-3"
            type="text"
            name="detailes"
            id="detailes"
            value={checkoutFormik.values.detailes}
            onBlur={checkoutFormik.handleBlur}
            onChange={checkoutFormik.handleChange}
          />
          {checkoutFormik.touched.detailes && checkoutFormik.errors.detailes ? (
            <div className="alert alert-danger">
              {checkoutFormik.errors.detailes}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="phone" className="text-white">
            Phone
          </label>
          <input
            className="form-control my-3"
            type="text"
            name="phone"
            id="phone"
            value={checkoutFormik.values.phone}
            onBlur={checkoutFormik.handleBlur}
            onChange={checkoutFormik.handleChange}
          />
          {checkoutFormik.touched.phone && checkoutFormik.errors.phone ? (
            <div className="alert alert-danger">
              {checkoutFormik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="city" className="text-white">
            City
          </label>
          <input
            className="form-control my-3"
            type="text"
            name="city"
            id="city"
            value={checkoutFormik.values.city}
            onBlur={checkoutFormik.handleBlur}
            onChange={checkoutFormik.handleChange}
          />
          {checkoutFormik.touched.city && checkoutFormik.errors.city ? (
            <div className="alert alert-danger">
              {checkoutFormik.errors.city}
            </div>
          ) : (
            ""
          )}
          <button type="submit" className="btn btn-main w-100 text-white">
            Confirm Order
          </button>
        </form>
      </div>
    </>
  );
}
