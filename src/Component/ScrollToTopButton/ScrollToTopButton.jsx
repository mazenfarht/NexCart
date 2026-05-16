import React, { useEffect, useState } from "react";

import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  // ================= SHOW BUTTON STATE =================

  const [showButton, setShowButton] = useState(false);

  // ================= SCROLL EVENT =================

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ================= SCROLL TO TOP =================

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {showButton && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </>
  );
}
