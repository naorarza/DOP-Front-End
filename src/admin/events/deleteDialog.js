import * as React from "react";
import { MAIN_ROUTE, TOKEN_HEADER } from "../../constant/urls";
import { doApiDelete } from "../../services/apiServices";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DeleteOutline, EventOutlined } from "@mui/icons-material";

export default function DeleteDialog({ doApi, item }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doEventDelete = async (_idDel) => {
    const url = MAIN_ROUTE + "events/" + _idDel;

    try {
      const data = await doApiDelete(url, TOKEN_HEADER);
      if (data.msg) return toast.error(data.msg);
      doApi();
      handleClose();
      toast.success("האירוע נמחק!");
    } catch (err) {
      console.log(err);
      alert("קרתה תקלה, בבקשה חזור מאוחר יותר");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button endIcon={<DeleteOutline/>} onClick={handleClickOpen} color="error" variant="outlined">
          מחיקה
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h3 className="text-info">
            האם אתה בטוח שברצונך למחוק אירוע זה?
            <hr className="p-0 m-0 mt-1" />
          </h3>
        </DialogTitle>
        <DialogContent>
        פעולה זו תמחק לצמיתות את האירוע של: {item.name}
        </DialogContent>
        <DialogActions className="d-flex justify-content-around">
          <Button color="error" variant="outlined" onClick={handleClose}>
            ביטול
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              doEventDelete(item._id);
            }}
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
