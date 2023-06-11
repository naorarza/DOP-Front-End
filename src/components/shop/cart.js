import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import CartList from "./cartList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet, doApiDelete } from "../../services/apiServices";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { toast } from "react-toastify";
import Loading from "../loading/loading";
import { motion } from "framer-motion";
import "./cart.css";

export default function Cart() {
  const { user, refreshCart, productsInCart, theme, text } =
    useContext(AuthContext);
  const [cartAr, setCartAr] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (productsInCart > 0) {
      refreshCart();
      doApi();
    }
  }, [productsInCart]);

  const doApi = async () => {
    let url = MAIN_ROUTE + "users/products";
    try {
      const data = await apiGet(url);
      setCartAr(data);
      console.log(productsInCart);
    } catch (error) {
      console.log(error);
    }
  };

  const doApiDeleteAll = async () => {
    const url = MAIN_ROUTE + "users/product/all";
    try {
      const data = await doApiDelete(url);
      doApi();
      refreshCart();
      toast.success("העגלה רוקנה בהצלחה!");
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="p-0 m-0"
      style={{ minHeight: "95vh", background: theme, color: text }}
    >
      {productsInCart !== 0 && user?.cart && cartAr.length > 0 ? (
        <div
          className="d-flex justify-content-center flex-column p-0 m-0"
          style={{ background: theme, color: text }}
        >
          <div className="d-flex align-items-center justify-content-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ y: [-50, 10, 0], opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center display-5 m-4"
            >
              עגלה
            </motion.h2>
          </div>
          <>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              style={{
                border: `2px solid ${theme === "#262b2f" ? "white" : "black"}`,
              }}
              className="changeCart rounded-2"
            >
              {cartAr.map((item, i) => {
                return (
                  <CartList
                    doApi={doApi}
                    setCartAr={setCartAr}
                    key={i}
                    index={i}
                    length={cartAr.length}
                    product={item}
                  />
                );
              })}
            </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="deleteAllBtn"
            >
              <Button
                onClick={doApiDeleteAll}
                color="error"
                variant="contained"
              >
                מחק הכל
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                style={{ height: "50px" }}
                className="w-25 mt-4"
                variant="contained"
                size="large"
                color="success"
                onClick={() => {
                  nav("/payment");
                }}
              >
                לתשלום
                <ShoppingCartCheckout />
              </Button>
            </motion.div>
          </>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
}
