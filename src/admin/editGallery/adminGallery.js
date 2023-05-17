import React, { useEffect, useState } from "react";
import AdminPhotos from "./adminPhotos";
// import ImageUploader from './imageUploader'
// import { Link } from "react-router-dom";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import { useContext } from "react";
// import AuthContext from "../../context/AuthContext";
import AuthAdminComp from "../authAdminComp";
import axios from "axios";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
export default function AdminGallery() {
  // const { user, isAdmin } = useContext(AuthContext);
  const [ar, setAr] = useState();
  const [searchQ, setSearchQ] = useState("pub");
  useEffect(() => {
    doApi();
  }, [searchQ]);

  const doApi = async () => {
    searchQ === "" && setSearchQ("pub");
    try {
      const data = await axios.get(
        `https://pixabay.com/api/?key=27132708-8c54ba3e2fa9897b06f49b52d&q=$${searchQ}&image_type=photo&pretty=true&per_page=50&safesearch=true`
      );
      const filteredAr = data.data.hits.filter(
        (item) => item.tags.includes("drink") || item.tags.includes("glass") || item.tags.includes("pouring")
      );
        setAr(filteredAr);
    } catch (err) {
      console.log(err);
      alert("There problem, come back later");
    }
  };
  const {theme , text} = useContext(AuthContext);
  
  return (
    <>
      <AuthAdminComp />
      <div
        style={{ minHeight: "95vh", background: theme , color: text}}
      >
        {/* <Link id="uploadImage" to="/admin/gallery/uploadImage">
          <AddAPhotoIcon
            id="uploadImageIcon"
            style={{ color: "blue", fontSize: "1.5em" }}
          />
        </Link> */}
        {ar ? (
          <div className="container">
            <h2 className="text-center display-3">Gallery</h2>
            <TextField
              id="demo-helper-text-misaligned"
              helperText="חפש תמונה"
              type="text"
              label="חיפוש"
              onChange={(e) => {
                setSearchQ(e.target.value);
              }}
            />
            
            <hr />
            <div className="d-flex p-5 gap-5 flex-wrap justify-content-center ">
              {ar.map((item,i) => {
                return (
                    <AdminPhotos key={i} item={item} />
                );
              })}
            </div>
            {/* <ImageUploader/> */}
          </div>
        ) : (
          <h2 className="text-center">Loading...</h2>
        )}
      </div>
    </>
  );
}
