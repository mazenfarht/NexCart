import React, { useContext } from "react";
import logo from "../../img/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

export default function Navbar() {
  let { cartCount, userToken, logout } = useContext(StoreContext);
  const navigate = useNavigate(); // ✅ جوه الكومبوننت

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-black">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {userToken ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn text-white position-relative border-0 d-flex align-items-center"
                    to="/cart"
                  >
                    Cart
                    <i className="fa-solid fa-cart-shopping ms-2" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                      {cartCount}
                    </span>
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
                <li className="nav-item">
                  <Link
                    className="btn text-white position-relative border-0 d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
              {/* <li className="nav-item">
                <Link
                  className="btn text-white position-relative border-0 d-flex align-items-center"
                  to="/cart"
                >
                  Cart
                  <i className="fa-solid fa-cart-shopping ms-2" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {cartCount}
                  </span>
                </Link>
              </li> */}

              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
