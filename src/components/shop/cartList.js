import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { apiPut, doApiDelete } from "../../services/apiServices";
import { MAIN_ROUTE } from "../../constant/urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function CartList(props) {
  const { user, refreshCart, productsInCart } = useContext(AuthContext);
  const product = props.product;
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

  const deleteProductFromCart = async () => {
    let url = MAIN_ROUTE + "users/product/delete/" + product._id;
    try {
      const data = await doApiDelete(url);
      doApi();
      refreshCart();
      toast.success("המוצר הוסר בהצלחה!");
      setCount(count - 1);
    } catch (error) {
      console.log(error);
    }
  };

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
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {user?.cart ? (
        <>
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div>
              <img
              onClick={()=>{nav('/product/'+ product._id)}}
                style={{
                  cursor:'pointer',
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
            <div>
              <p>product name: {product.product_name}</p>
              <p>
                product price: {product.product_price * product.amount_product}₪
              </p>
            </div>
            <div>
              <p>product amount: {product.amount_product}</p>
              <div className="d-flex justify-content-between">
              {!loading ? 
              <>
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
                </>
               : <CircularProgress/>}
                <Button
                  onClick={deleteProductFromCart}
                  variant="contained"
                  size="small"
                  color="error"
                >
                  מחק
                </Button>
              </div>
            </div>
          </div>
          <hr className="m-1" />
        </>
      ) : (
        <h2>Loading product..</h2>
      )}
    </>
  );
}
