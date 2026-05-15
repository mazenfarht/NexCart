import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let { userToken, isLoading } = useContext(StoreContext);

  if (isLoading) {
    return null;
  }
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
}
