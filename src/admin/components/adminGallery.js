import React from "react";
import useAuth from "../../isLogged";
import AdminPhotos from "./adminPhotos";
// import ImageUploader from './imageUploader'
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link } from "react-router-dom";
import AuthAdminComp from "../authAdminComp";

export default function AdminGallery() {

  return (
    <>
      <AuthAdminComp />
      <div className="container mt-5">
        <h2 className="text-center m-3 display-3">Gallery</h2>
        {/* <ImageUploader/> */}
        <Link id="uploadImage" to="/admin/gallery/uploadImage">
          <AddPhotoAlternateIcon
            id="uploadImageIcon"
            style={{ color: "blue", fontSize: "1.5em" }}
          />
        </Link>
        <hr />
        <AdminPhotos />
      </div>
    </>
  );
}
