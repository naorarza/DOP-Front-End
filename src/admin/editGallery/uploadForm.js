import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "./upload.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AuthAdminComp from "../authAdminComp";
import { MAIN_ROUTE } from "../../constant/urls";

export default function UploadForm() {
  const { isAdmin } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));

      document.querySelector("#showImage").style.display = "none";
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    onImageChange(event);
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.warn("Please select a PNG, JPEG, or JPG image");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("myFile", selectedFile);
      // if(selectedFile == null){
      //   return toast.error('Please choose image first!')
      // }

      // Use fetch or your preferred library to upload the image
      const url = MAIN_ROUTE + 'uploads';
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Image uploaded successfully", data);
        })
        .catch((error) => {
          toast.error("Error uploading image", error);
        });
    } else {
      toast.warn(
        "Please select an image to upload\n[JPG,JPEG,PNG] are allowed!"
      );
    }
  };

  return (
    <div
      style={{ minHeight: "92vh", background: "#313131"}}
      className="d-flex align-items-center justify-content-center"
    >    <AuthAdminComp/>

      {isAdmin ? (
        <form
          onSubmit={handleSubmit}
          action="upload.php"
          id="uploadForm"
          method="POST"
          className="position-fixed"
        >
          {/* <input type="file" multiple onChange={handleFileChange}/> */}
          
          <input type="file" onChange={handleFileChange} className="w-100 h-100 filetype" />

          <p>
            <span id="showImage" style={{ position: "relative", top: "-80%" }}>
              <div className="row flex-column g-0 align-items-center">
                <UploadFileIcon style={{ fontSize: "4em" }} />
                <span style={{ width: "250px" }}>לחץ או תגרור תמונה לכאן</span>
              </div>
            </span>
            <img
              alt=""
              src={image}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </p>
          <div className="d-flex justify-content-around">
            <Tooltip title="remove" enterDelay={500} leaveDelay={200}>
              <Button
                variant="outlined"
                color="error"
                onClick={(e) => {
                  e.preventDefault();
                  setImage();
                  document.querySelector(".filetype").value = null;
                  document.querySelector("#showImage").style.display = "inline";
                }}
              >
                Remove
              </Button>
            </Tooltip>

            <Tooltip title="upload" enterDelay={500} leaveDelay={200}>
              <Button variant="contained" color="success" type="submit">
                Upload
              </Button>
            </Tooltip>
          </div>
        </form>
      ) : (
        <h2>Page Not Found Error 404!</h2>
      )}
    </div>
  );
}
