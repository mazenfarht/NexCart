import React from "react";
import "./ContactUsStyle.css";

import { useFormik } from "formik";
import * as Yup from "yup";

import toast, { Toaster } from "react-hot-toast";

export default function ContactUs() {
  // ================= VALIDATION =================

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    description: Yup.string()
      .min(10, "Message is too short")
      .required("Message is required"),
  });

  // ================= FORMIK =================

  const contactFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
    },

    validationSchema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      // SUCCESS NOTIFICATION
      toast.success("Message sent successfully 🚀");

      // RESET FORM
      resetForm();
    },
  });

  return (
    <>
      {/* ================= TOASTER ================= */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* ================= CONTACT SECTION ================= */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-box">
            {/* TITLE */}
            <h2 className="contact-title">
              Contact <span>Us</span>
            </h2>

            <p className="contact-subtitle">
              Have a question or feedback? Send us a message.
            </p>

            {/* FORM */}
            <form onSubmit={contactFormik.handleSubmit}>
              {/* NAME */}
              <div className="mb-4">
                <label htmlFor="name">Name</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={contactFormik.values.name}
                  onChange={contactFormik.handleChange}
                  onBlur={contactFormik.handleBlur}
                  className="form-control contact-input"
                />

                {contactFormik.touched.name && contactFormik.errors.name ? (
                  <div className="error-message">
                    {contactFormik.errors.name}
                  </div>
                ) : null}
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={contactFormik.values.email}
                  onChange={contactFormik.handleChange}
                  onBlur={contactFormik.handleBlur}
                  className="form-control contact-input"
                />

                {contactFormik.touched.email && contactFormik.errors.email ? (
                  <div className="error-message">
                    {contactFormik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* MESSAGE */}
              <div className="mb-4">
                <label htmlFor="description">Message</label>

                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="Write your message..."
                  value={contactFormik.values.description}
                  onChange={contactFormik.handleChange}
                  onBlur={contactFormik.handleBlur}
                  className="form-control contact-input textarea"
                ></textarea>

                {contactFormik.touched.description &&
                contactFormik.errors.description ? (
                  <div className="error-message">
                    {contactFormik.errors.description}
                  </div>
                ) : null}
              </div>

              {/* BUTTON */}
              <button type="submit" className="contact-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
