import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet } from "../../services/apiServices";
import "./products.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function ProductPage() {
  let params = useParams();
  const [product, setProduct] = useState();
  const { theme , text } = useContext(AuthContext);

  useEffect(() => {
    findProduct();
  }, []);

  const findProduct = async () => {
    const url = MAIN_ROUTE + "products/" + params.id;
    try {
      let data = await apiGet(url);
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ minHeight: "95vh", background: theme, color: text }}>
      <h2 className="text-center pt-5 display-4 ">
        מידע אודות המוצר
      </h2>
      <hr style={{color: text}}/>
      {product?.img_url && (
        <div
          style={{ minHeight: "55vh" }}
          className="text-dark d-flex justify-content-center align-items-center"
        >
          <div
            className="m-3 rounded-2 p-3"
            style={{ background: "#eff", border: "3px solid grey" }}
          >
            <div className="d-flex d-flex flex-wrap">
              <div className="col-md-6 col-lg-6 col-sm-6 imageHolder">
                <img
                  style={{ borderRadius: "8px", border: "2px solid black" }}
                  className="col-md-10 col-lg-8 col-sm-12 productImage"
                  src={product.img_url}
                  alt={product.product_name}
                />
              </div>
              <div className="col-md-6 col-lg-6 textHolder col-sm-6 pe-3 pt-3 d-flex flex-column justify-content-center">
                <div className="fs-4" style={{ padding: "12px" }}>
                  <p>שם המוצר: {product.product_name}</p>
                  <p>מחיר המוצר: {product.product_price}₪</p>
                  <p>
                    האם קיים בתפריט: {product.inMenu && <span>כן</span>}
                    {!product.inMenu && <span>לא</span>}
                  </p>
                  {product.category !== "" && (
                    <p>קטגוריה: {product.category}</p>
                  )}
                </div>
              </div>
            </div>
            <hr className="p-0 m-0" />
            <div className="p-3 fs-5">
              <p>מידע אודות המוצר: {product.info}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
