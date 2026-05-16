import React from "react";
import Navbar from "../Component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer/Footer";
import ScrollToTopButton from "../Component/ScrollToTopButton/ScrollToTopButton";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
