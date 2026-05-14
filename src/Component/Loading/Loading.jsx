import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-page">
      <div className="loader"></div>
      <h3>Loading...</h3>
      <p>Please wait while we prepare your data</p>
    </div>
  );
}
