import { DownloadOutlined } from "@mui/icons-material";
import { Button, DialogActions, IconButton, Tooltip } from "@mui/material";
import React from "react";
import ImageDialog from "../../components/imageDialog";

export default function AdminPhotos(props) {
  const item = props.item;

  return (
    <div className="text-center">
      <div className="col-12 position-relative">
        <img
          className="rounded-3"
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
            <IconButton aria-label="Download">
              <Tooltip placement="left" title="הורדה">
                <DownloadOutlined color="info" />
              </Tooltip>
            </IconButton>
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
    </div>
  );
}
