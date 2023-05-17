import React from "react";
import "./adminProduct.css";
import { MAIN_ROUTE } from "../../constant/urls";
import { doApiDelete } from "../../services/apiServices";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AuthAdminComp from "../authAdminComp";
import EditProductForm from "./editProductForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ProductViewAdmin(props) {
  const product = props.item;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  
  
  const deleteProduct = async () => {
    const url = MAIN_ROUTE + "products/" + props.item._id;
    try {
      const data = await doApiDelete(url);
      if (data.deletedCount) {
        toast.success("המוצר נמחק בהצלחה!");
        props.refresh();
        setOpen(false);
      } else {
        toast.error("משהו כנראה השתבש..");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.info("There problem, come back later");
      setOpen(false);
    }
  };

  return (
    <>
      <AuthAdminComp />
      
      <div className="parent">
        <img
        style={{borderRadius:'8px'}}
          className="productImg"
          src={product.img_url}
          alt={product.product_name}
          width={"100%"}
          height={"200px"}
        />
        <p className="me-2">שם המוצר: {product.product_name}</p>
        {/* <p className="me-2">כמות זמינה: {product.amount_product}</p> */}
        {/* <p className="ms-2">האם נמצא בתפריט: {product.inMenu}</p> */}
        <Tooltip title={product.info}>
          <p className="me-2">מידע על המוצר: {product.info.substring(0, 22)}</p>
        </Tooltip>
        <p className="me-2">מחיר: {product.product_price}₪</p>
        <hr />
        <div className="d-flex flex-row m-2 align-content-end justify-content-around">
          {/* -------------------------------------------- */}
          <Tooltip title="מחיקת מוצר">
            <Button
              onClick={handleClickOpenDelete}
              variant="outlined"
              color="error"
            >
              <DeleteForeverIcon />
            </Button>
          </Tooltip>
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"האם אתה בטוח שברצונך למחוק מוצר זה?"}
            </DialogTitle>
            <DialogActions>
              <Button color="error" variant="outlined" onClick={handleCloseDelete}>ביטול</Button>
              <Button color="primary" variant="contained" onClick={deleteProduct} autoFocus>
                אישור
              </Button>
            </DialogActions>
          </Dialog>
          {/* -------------------------------------------- */}
          <Tooltip title="עריכת מוצר">
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="secondary"
            >
              <EditIcon />
            </Button>
          </Tooltip>
          <Dialog open={open} onClose={handleClose}>
            <DialogActions className="d-flex justify-content-start">
              <IconButton
                aria-label="Close"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogActions>
            <DialogContent>
              <EditProductForm
                refresh={props.refresh}
                catAr={props.catAr}
                item={product}
                handleClose={handleClose}
              />
            </DialogContent>
          </Dialog>
          {/* -------------------------------------------- */}
        </div>
      </div>
    </>
  );
}
