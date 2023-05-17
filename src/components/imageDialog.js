import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { FullscreenOutlined, OpenInFullSharp } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ImageDialog(props) {
  const item = props.item;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "absolute", top: "0%", right: "0%" }}>
      <DialogActions>
      <Tooltip placement="right" title="מסך מלא">
        <IconButton aria-label="Close" onClick={handleClickOpen}>
          <OpenInFullSharp
            color="secondary"
            style={{ cursor: "pointer" }}
            onClick={handleClickOpen}
          />
        </IconButton>
        </Tooltip>
      </DialogActions>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogActions className="d-flex justify-content-start">
            <IconButton aria-label="Close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <img height="400px" width="100%" src={item.largeImageURL} alt="drink" title="photo" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
