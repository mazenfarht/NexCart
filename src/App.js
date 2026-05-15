// import Products from "./Component/Products/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./MainLayout/Layout";
import Products from "./Component/Products/Products";
import ProductDetailes from "./Component/ProductDetailes/ProductDetailes";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import NotFoundPage from "./Component/NotFoundPage/NotFoundPage";
import { ToastContainer } from "react-toastify";
import StoreContextProvider from "./Component/Context/StoreContext";
import Cart from "./Component/Cart/Cart";
import CheckOut from "./Component/CheckOut/CheckOut";
export default function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "home", element: <HomePage /> },
        { path: "products", element: <Products /> },
        { path: "product-detailes/:id", element: <ProductDetailes /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "checkout", element: <CheckOut /> },
        { path: "cart", element: <Cart /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>
    </>
  );
}
