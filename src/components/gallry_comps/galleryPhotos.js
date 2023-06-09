import { DownloadOutlined } from "@mui/icons-material";
import { DialogActions, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import ImageDialog from "../imageDialog";
import { motion } from "framer-motion";

export default function GalleryPhotos(props) {
  const item = props.item;
  const time = props.time;
  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: time }}
      className="text-center"
    >
      <div className="col-12 position-relative">
        <img
          className="rounded-3 border border-2"
          width="200px"
          height="200px"
          src={item.largeImageURL}
          alt=""
        />
        <ImageDialog item={item} />
        <DialogActions>
          <a
            style={{ position: "absolute", bottom: "9%" }}
            href={item.previewURL}
            download
          >
            <Tooltip placement="left" title="הורדה">
              <IconButton aria-label="Download">
                <DownloadOutlined color="info" />
              </IconButton>
            </Tooltip>
          </a>
        </DialogActions>
      </div>
      {/* <Button className="m-2" color="info" variant="contained">
          <DownloadOutlined />
        </Button> */}
      {/* <div className="mt-2">
        <Button variant="contained" color="secondary" className="m-2">
          שנה תמונה
        </Button>
        <Button variant="outlined" color="error" className="">
          הסר
        </Button>
      </div> */}
    </motion.div>
  );
}
