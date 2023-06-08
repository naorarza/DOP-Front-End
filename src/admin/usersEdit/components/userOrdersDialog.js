import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { MAIN_ROUTE } from "../../../constant/urls";
import { apiGet } from "../../../services/apiServices";
import { useEffect } from "react";
import ViewProduct from "./viewProduct";
import { toast } from "react-toastify";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AuthContext from "../../../context/AuthContext";

export default function UserOrdersDialog({ doApi, item }) {
  const [open, setOpen] = useState(false);
  const [ordersAr, setOrdersAr] = useState(null);
  const { text, theme } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
    if (ordersAr.length === 0) {
      toast.info("משתמש זה לא ביצע הזמנות מעולם!");
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    doApiOrders();
  }, []);

  const doApiOrders = async () => {
    let url = MAIN_ROUTE + "orders";
    try {
      let data = await apiGet(url);
      let filtered = data.filter((order) => order.user_id === item._id);
      setOrdersAr(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="inherit" variant="text">
        <div className="d-flex justify-content-between w-100">
          <ListAltIcon className="ms-2" />
          <p className="text-center">היסטוריית הזמנות</p>
        </div>{" "}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center">
          היסטוריית ההזמנות של : {item.name}
        </DialogTitle>
        <DialogContent className="text-center">
          <div className="d-flex flex-wrap justify-content-center">
            {ordersAr != null &&
              ordersAr.map((cart, i) => {
                return (
                  <div
                    key={i}
                    className="rounded-3 m-2 p-2"
                    style={{border:`2px solid ${text}`}}
                  >
                    <p className="text-info">הזמנה מספר - {i + 1}</p>
                    <p className="text-info">סטטוס הזמנה: {cart.status}</p>
                    {cart.products_ar.map((product, i) => {
                      return (
                        <div key={i}>
                          <p>מוצר: {product.product_name}</p>
                          <ViewProduct product={product} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center">
          <Button color="error" variant="outlined" onClick={handleClose}>
            יציאה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
