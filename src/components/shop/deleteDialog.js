import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { doApiDelete } from "../../services/apiServices";
import { MAIN_ROUTE } from "../../constant/urls";
import AuthContext from "../../context/AuthContext";
import { useState } from "react";

export default function DeleteDialog({doApi , setCount , count , product}) {
  const [open, setOpen] = useState(false);
    const { refreshCart } = useContext(AuthContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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

  return (
    <>
      <Button
        endIcon={<Delete />}
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        color="error"
        fullWidth
      >
        מחק
      </Button>
      <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`האם אתה בטוח שברצונך למחוק את '${product.product_name}' מהעגלה?`}
            </DialogTitle>
            <DialogActions className="d-flex justify-content-between">
              <Button
                color="error"
                variant="outlined"
                onClick={handleClose}
              >
                ביטול
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={deleteProductFromCart}
                autoFocus
              >
                אישור
              </Button>
            </DialogActions>
          </Dialog>
    </>
  );
}
