import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { apiPut, doApiDelete } from "../../services/apiServices";
import { MAIN_ROUTE } from "../../constant/urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import DeleteDialog from "./deleteDialog";

export default function CartList(props) {
  const { user, doApiGetValue ,refreshCart, productsInCart } = useContext(AuthContext);
  const product = props.product;
  const index = props.index;
  const length = props.length;
  const doApi = props.doApi;
  const nav = useNavigate();
  const [count, setCount] = useState(productsInCart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (count === 0) {
      nav("/");
      toast.info("העגלה ריקה!");
    }
    console.log(count);
  }, [count]);

  

  const updateProductAmount = async (upOrDown) => {
    if (upOrDown === "down" && product.amount_product === 1) {
      return toast.info("אין אפשרות להזמין פחות ממוצר-1 לפחות!");
    } else {
      let url = MAIN_ROUTE + "users/product/" + product._id + "/" + upOrDown;
      try {
        setLoading(true);
        let data = await apiPut(url);
        console.log(data);
        doApi();
        setLoading(false);
        doApiGetValue();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {user?.cart ? (
        <>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: index / 10 + 0.3 + 0.3 }}
            className="productInCart"
          >
            <div>
              <img
                onClick={() => {
                  nav("/product/" + product._id);
                }}
                style={{
                  cursor: "pointer",
                  maxWidth: "130px",
                  maxHeight: "130px",
                  minHeight: "130px",
                  borderRadius: "4px",
                }}
                src={product.img_url}
                alt={product.product_name}
                title={product.product_name}
              />
            </div>
            <div className="fs-5">
              <p>שם המוצר: {product.product_name}</p>
              <p>
                מחיר המוצר: {product.product_price * product.amount_product}₪
              </p>
            </div>
            <div className="littleButton">
              <p className="text-center fs-5">כמות: {product.amount_product}</p>
              <div className="d-flex justify-content-between flex-column ms-3">
                {!loading ? (
                  <div className="plusMinus">
                    <Button
                      className="ms-2"
                      variant="contained"
                      size="small"
                      color="info"
                      onClick={() => {
                        updateProductAmount("up");
                      }}
                    >
                      +
                    </Button>
                    <Button
                      onClick={() => {
                        updateProductAmount("down");
                      }}
                      variant="contained"
                      size="small"
                      color="warning"
                    >
                      -
                    </Button>
                  </div>
                ) : (
                  <CircularProgress />
                )}
                <div className="d-flex align-items-center justify-content-center pt-2">
                  <DeleteDialog doApi={doApi} setCount={setCount} count={count}  product={product}/>
                </div>
              </div>
            </div>
          </motion.div>
          {index + 1 < length && <hr className="m-0 p-0" />}
        </>
      ) : (
        <h2>Loading product..</h2>
      )}
    </>
  );
}
