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

export default function OrderDataDialog({ fixedDate, item }) {
  const [open, setOpen] = useState(false);
  const { text } = useContext(AuthContext);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Button onClick={handleClickOpen} color="inherit" variant="text">
        <div className="d-flex justify-content-between w-100">
          <ListAltIcon className="ms-2" />
          <p className="text-center">פרטי ההזמנה</p>
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center">
          <h2> פרטי ההזמנה של: {item.name}</h2>
          <p>סכום הזמנה: {(item.order_price / 0.27402).toFixed(2)}₪</p>
          <hr className="p-0 m-0" />
        </DialogTitle>
        <DialogContent className="text-center justify-content-center d-flex flex-wrap">
          <div className="col-12 lightboxInfo">
            <p> מספר טלפון: {item.phone}</p>
            <p>תאריך הזמנה: {fixedDate(item.order_date)}</p>
          </div>
          {item.products_ar.map((product, i) => {
            return (
              <div
                key={i}
                className="rounded-3 col-md-auto m-2 p-2"
                style={{border:`2px solid ${text}`}}
              >
                <div key={i}>
                  <p>מוצר: {product.product_name}</p>
                  <ViewProduct product={product} />
                </div>
              </div>
            );
          })}
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
