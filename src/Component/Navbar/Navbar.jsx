import React, { useContext } from "react";
import logo from "../../img/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import "./Navbar.css";
export default function Navbar() {
  const { cartCount, userToken, logout } = useContext(StoreContext);

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3">
      <div className="container">
        {/* LOGO */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVBAR CONTENT */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* LEFT LINKS */}
          {userToken && (
            <ul className="navbar-nav mb-2 mb-lg-0 ms-lg-4 gap-lg-2">
              <li className="nav-item">
                <NavLink className="nav-link nav-modern-link" to="/home">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link nav-modern-link" to="/products">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link nav-modern-link" to="/">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link nav-modern-link" to="/contact-us">
                  Contact-Us
                </NavLink>
              </li>
            </ul>
          )}

          {/* RIGHT SIDE */}
          <div className="ms-auto d-flex flex-column flex-lg-row gap-2 gap-lg-3 align-items-lg-center mt-3 mt-lg-0">
            {userToken ? (
              <>
                {/* CART */}
                <Link
                  className="btn nav-modern-btn position-relative d-flex align-items-center"
                  to="/cart"
                >
                  Cart
                  <i className="fa-solid fa-cart-shopping ms-2"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    {cartCount}
                  </span>
                </Link>

                {/* WISHLIST */}
                <Link
                  className="btn nav-modern-btn d-flex align-items-center"
                  to="/wishlist"
                >
                  Wishlist
                  <i className="fa-solid fa-heart ms-2"></i>
                </Link>

                {/* LOGOUT */}
                <button className="btn nav-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* LOGIN */}
                <NavLink className="btn nav-login-btn" to="/login">
                  Login
                </NavLink>

                {/* REGISTER */}
                <NavLink className="btn nav-register-btn" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
