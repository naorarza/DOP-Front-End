import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet, apiPut } from "../../services/apiServices";
import "./products.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Button, LinearProgress } from "@mui/material";
import { AddShoppingCartSharp } from "@mui/icons-material";
import Loading from "../loading/loading";
import { motion } from "framer-motion";

export default function ProductPage() {
  let params = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState();
  const { refreshCart, user , theme, text } = useContext(AuthContext);

  useEffect(() => {
    findProduct();
  }, []);

  const findProduct = async () => {
    const url = MAIN_ROUTE + "products/" + params.id;
    console.log(params);

    try {
      let data = await apiGet(url);
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    let url = MAIN_ROUTE + "users/cart/" + product._id;
    try {
      setLoading(true);
      let data = await apiPut(url);

      await updateProductAmount();
      await refreshCart();
      data.modifiedCount > 0 && toast.success("המוצר התווסף לעגלה!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("משהו השתבש נסה שנית מאוחר יותר!");
    }
  };

  const updateProductAmount = async () => {
    let url = MAIN_ROUTE + "users/productNum/up";
    try {
      const data = await apiPut(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {product?.img_url ? (
        <div style={{ minHeight: "95vh", background: theme, color: text }}>
          <h2 className="text-center pt-5 display-4 ">מידע אודות המוצר</h2>
          <hr style={{ color: text }} />
          {product?.img_url && (
            <div
              style={{ minHeight: "55vh" }}
              className="text-dark d-flex justify-content-center align-items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="m-3 rounded-2 p-3 container"
                style={{
                  background: "#eff",
                  border: "3px solid grey",
                  width: "600px",
                  minHeight: "300px",
                }}
              >
                <div className="d-flex d-flex flex-wrap">
                  <div className="col-md-6 col-lg-6 col-sm-6 imageHolder">
                    <img
                      style={{
                        maxWidth: "280px",
                        maxHeight: "220px",
                        minHeight: "220px",
                        borderRadius: "8px",
                        border: "2px solid black",
                      }}
                      className="productImage"
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
                <hr className="p-0 mt-4 m-0" />
                <div className="p-3 fs-5 d-flex justify-content-around flex-wrap">
                  <p>מידע אודות המוצר: {product.info}</p>
                  {!product.inMenu && user?.name ? (
                    <Button
                      onClick={addToCart}
                      color="info"
                      variant="contained"
                    >
                      {!loading ? (
                        <>
                          הוסף לעגלה <AddShoppingCartSharp className="me-3" />{" "}
                        </>
                      ) : (
                        <p className="w-100 p-2 m-0">
                          <LinearProgress color="secondary" />
                        </p>
                      )}
                    </Button>
                  ) : (<></>)}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
