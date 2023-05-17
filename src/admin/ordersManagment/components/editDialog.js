import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { MAIN_ROUTE } from "../../../constant/urls";
import axios from "axios";
import { API_KEY } from "../../../constant/constants";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";

export default function EditDialog({ doApi, item }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [change, setChange] = useState("");

  const handleChange = (event) => {
    setChange(event.target.value);
  };

  const changeRole = async (_id, status) => {
    const url = MAIN_ROUTE + "orders/status/" + _id;
    try {
      let data = await axios({
        method: "PATCH",
        url,
        data: {
          status
        },
        headers: {
          "x-api-key": localStorage[API_KEY],
        },
      });
      toast.success("סטטוס ההזמנה שונה");
      handleClose();
      doApi();
    } catch (err) {
      toast.warning(err.response.data.msg);
      console.log(err.response.data.msg);
      return err;
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="inherit" variant="text">
        <div className="d-flex justify-content-around w-100">
          <EditIcon className="ms-2" />
          <p className="text-center">עריכת סטטוס ההזמנה</p>
        </div>{" "}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>שינוי סטטוס הזמנה</DialogTitle>
        <DialogContent>
          <p>שם המשתמש: {item.name}</p>
          <Box sx={{ minWidth: 120 }}>
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">סטטוס</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={change}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"ממתין לאישור"}>ממתין לאישור</MenuItem>
                <MenuItem value={"נשלח"}>נשלח</MenuItem>
                <MenuItem value={"התקבל"}>התקבל</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions className="d-flex justify-content-around">
          <Button color="error" variant="outlined" onClick={handleClose}>
            ביטול
          </Button>
          <Button
            onClick={() => {
              changeRole(item._id, change);
            }}
            color="secondary"
            variant="contained"
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
