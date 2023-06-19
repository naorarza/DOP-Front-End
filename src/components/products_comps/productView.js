import { AddShoppingCartSharp } from "@mui/icons-material";
import { Button, LinearProgress, Tooltip } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiPut } from "../../services/apiServices";
import "./products.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductView(props) {
  const product = props.item;
  const { refreshCart, user } = useContext(AuthContext);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

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
      <img
        onClick={() => {
          nav("/product/" + product._id);
        }}
        style={{ borderRadius: "4px", cursor: "pointer" }}
        className="productImg"
        src={product.img_url}
        alt={product.product_name}
        width={"100%"}
        height={"200px"}
      />
      {/* <p style={{fontSize:"1.2em"}} className="me-2 text-info text-center">{product.category}</p> */}
      <p className="me-2">שם המוצר: {product.product_name}</p>
      {/* <p className="me-2">כמות זמינה: {product.amount_product}</p> */}
      {/* <p className="ms-2">האם נמצא בתפריט: {product.inMenu}</p> */}
      <p className="me-2">
        מידע על המוצר:
        <Tooltip
          title={product.info}
          placement="bottom"
          enterDelay={500}
          leaveDelay={200}
        >
          <span>
            {product.info.slice(0, 17)}
            {product.info.length > 17 && "..."}
          </span>
        </Tooltip>
      </p>
      <p className="me-2">מחיר: {product.product_price}₪</p>
      {user?.name ? (
        <Button onClick={addToCart} color="info" variant="contained">
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
      ) : (
        <>
          <p
            className="m-2"
            style={{
              color: "grey",
              wordBreak: "break-word",
              borderTop: "1px solid black",
            }}
          >
            על מנת להוסיף את המוצר לעגלה עליך להתחבר
          </p>
          <Button disabled onClick={addToCart} color="info" variant="contained">
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
        </>
      )}
    </>
  );
}
