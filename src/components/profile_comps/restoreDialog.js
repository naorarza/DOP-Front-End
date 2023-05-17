import { RestartAltOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./upload.css";
import { toast } from "react-toastify";
import { API_KEY } from "../../constant/constants";
import axios from "axios";
import { MAIN_ROUTE } from "../../constant/urls";
import AuthContext from "../../context/AuthContext";

export default function RestoreDialog({ setChanging }) {
  const [open, setOpen] = useState(false);
  const { mutate } = useContext(AuthContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doApiResetProfile = async () => {
    let url = MAIN_ROUTE + "users/profile/reset";
    // setLoading(true)
    setChanging(true);
    try {
      let { data } = await axios({
        method: "PUT",
        url,
        headers: { "x-api-key": localStorage[API_KEY] },
      });
      handleClose()
      console.log(data);

      if (data.modifiedCount) {
        setOpen(false);
        setChanging(false);
        mutate();
        toast.success("תמונת הפרופיל התאפסה!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Tooltip title="שחזור לתמונה אנונימית">
        <button id="restoreBtn" onClick={handleClickOpen}>
          <RestartAltOutlined />
        </button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <span className="text-info">
            האם אתה בטוח שברצונך למחוק את תמונת הפרופיל שלך ?
            <hr className="p-0 m-0 mt-1" />
          </span>
        </DialogTitle>
        <DialogContent>פעולה זו תמחק לצמיתות את התמונה הקיימת</DialogContent>
        <DialogActions className="d-flex justify-content-around">
          <Button color="error" variant="outlined" onClick={handleClose}>
            ביטול
          </Button>
          <Button color="secondary" variant="contained" onClick={doApiResetProfile}>
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
