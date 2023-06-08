import "../css/footer.css";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="footerDiv position-static bg-dark text-light d-flex flex-wrap container-fluid justify-content-around">
      <div className="footerNav mt-3 text-center d-flex flex-wrap gap-3 col-md-4 col-sm-2 me-2">
        <Link
          className="hoverLink"
          to="/"
          onClick={() => {
            scrollToTop();
          }}
        >
          עמוד בית
        </Link>
        <Link
          className="hoverLink"
          to="/gallery"
          onClick={() => {
            scrollToTop();
          }}
        >
          גלריה
        </Link>
        <Link
          className="hoverLink"
          to="/products"
          onClick={() => {
            scrollToTop();
          }}
        >
          מוצרים
        </Link>
        <Link
          className="hoverLink"
          to="/menu"
          onClick={() => {
            scrollToTop();
          }}
        >
          תפריט
        </Link>
      </div>
      <div className="footerIconDad text-center d-flex flex-wrap align-items-center justify-content-between col-6">
        <Link
          className="iconFooter mt-2 fs-4 text-decoration-none text-danger"
          to="http://instagram.com"
        >
          <FaInstagram />
        </Link>
        <Link
          className="iconFooter mt-2 fs-4 text-decoration-none text-info"
          to="http://facebook.com"
        >
          <FaFacebook />
        </Link>
        <Link
          className="iconFooter mt-2 fs-4 text-decoration-none text-info-emphasis"
          to="http://tiktok.com"
        >
          <FaTiktok />
        </Link>
        <Link
          className="iconFooter mt-2 fs-4 text-decoration-none text-primary"
          to="http://twitter.com"
        >
          <FaTwitter />
        </Link>
      </div>
      <hr className="text-light w-100 p-0 mt-2 m-0" />
      <div className="col-12 d-flex align-items-center justify-content-center text-center">
      כל הזכויות שייכות ל DrinkOrderParty © 2023
      </div>
    </div>
  );
}
