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

export default function Cart() {
  const { user, refreshCart, productsInCart , theme , text } = useContext(AuthContext);
  const [cartAr, setCartAr] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (productsInCart < 1) {
      nav("/");
      toast.info("העגלה ריקה, עליך לבחור לפחות פריט אחד על מנת לגשת אליה");
    }
    refreshCart();
    doApi();
  }, []);

  const doApi = async () => {
    let url = MAIN_ROUTE + "users/products";
    try {
      const data = await apiGet(url);
      setCartAr(data);
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
    <>
      {productsInCart !== 0 && (
        <div
          className="d-flex justify-content-center row p-0 m-0"
          style={{ minHeight: "95vh", background: theme, color: text }}
        >
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="text-center display-5">עגלה</h2>
          </div>
          {user?.cart ? (
            <>
              <div className="container border border-light mb-5 border-2 rounded-2 col-md-7 col-sm-7">
                {cartAr.map((item, i) => {
                  return (
                    <CartList
                      doApi={doApi}
                      setCartAr={setCartAr}
                      key={i}
                      product={item}
                    />
                  );
                })}
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    onClick={doApiDeleteAll}
                    color="error"
                    variant="contained"
                  >
                    מחק הכל
                  </Button>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-2">
                <Button
                  style={{ height: "50px" }}
                  className="m-3 w-25"
                  variant="contained"
                  size="large"
                  color="success"
                >
                  לתשלום
                  <ShoppingCartCheckout className="me-5" />
                </Button>
              </div>
            </>
          ) : (
            <h2>Loading..</h2>
          )}
        </div>
      )}
    </>
  );
}
