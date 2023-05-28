import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiPut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { Button, LinearProgress, Tooltip } from "@mui/material";
import { AddShoppingCartSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductViewMenu(props) {
  const product = props.item;
  const { refreshCart } = useContext(AuthContext);
  const nav = useNavigate();
  const [loading,setLoading] = useState(false);

  return (
    <>
      <img
        style={{ borderRadius: "8px", cursor: "pointer" }}
        onClick={() => {
          nav("/product/" + product._id);
        }}
        className="productImg"
        src={product.img_url}
        alt={product.product_name}
        width={"100%"}
        height={"200px"}
      />
      <p style={{ fontSize: "1.2em" }} className="m-0 text-info text-center">
        {product.category}
      </p>
      <hr className="p-0 mt-0" />
      <p className="me-2">שם המוצר: {product.product_name}</p>
      <p className="me-2">כמות זמינה: {product.amount_product}</p>
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
    </>
  );
}
