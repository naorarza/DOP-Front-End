import React, { useState } from "react";
import UploadWidget from "./uploadWidget";
import { Modal } from "antd";
import { Button, Fab, Tooltip } from "@mui/material";
import "./upload.css";
import { RestartAltOutlined } from "@mui/icons-material";
import RestoreDialog from "./restoreDialog";

export default function UploadImage({ setChanging }) {
  const [open, setOpen] = useState(false);

  
  return (
    <div>
      <div className="d-flex">
        <RestoreDialog setChanging={setChanging}/> 
        <Tooltip className="me-3" title="שינוי תמונת פרופיל">
          <Button
            color="info"
            variant="contained"
            className="fs-6"
            onClick={() => setOpen(true)}
          >
            שינוי פרופיל
          </Button>
        </Tooltip>
      </div>
      {open && (
        <>
          <Modal
            title="העלאת תמונת פרופיל חדשה"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            okText="אוקיי"
            cancelText="ביטול"
            setOpen={setOpen}
          >
            <UploadWidget
              setChanging={setChanging}
              open={open}
              setOpen={setOpen}
            />
          </Modal>
        </>
      )}
    </div>
  );
}
