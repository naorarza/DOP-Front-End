import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthAdminComp from "../../admin/authAdminComp";
import GalleryPhotos from "./galleryPhotos";
import { TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function Gallery() {
  const [ar, setAr] = useState();
  const [searchQ, setSearchQ] = useState("pub");
  const { theme , text } = useContext(AuthContext);

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
        (item) =>
          item.tags.includes("drink") ||
          item.tags.includes("glass") ||
          item.tags.includes("pouring")
      );

      setAr(filteredAr);
    } catch (err) {
      console.log(err);
      alert("There problem, come back later");
    }
  };

  const translate = async (event) => {
    if (event.target.value !== "") {
      let sourceLang = "he";
      let targetLang = "en";

      let url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
        sourceLang +
        "&tl=" +
        targetLang +
        "&dt=t&q=" +
        encodeURI(event.target.value);
      try {
        let resp = await axios.get(url);

        setSearchQ(resp.data[0][0][0]);
      } catch (err) {
        console.log(err);
        alert("There problem, come back later");
      }
    } else {
      setSearchQ("pub");
    }
  };

  return (
    <>
      <div
        style={{ minHeight: "95vh", background: theme, color: text }}
      >
        {/* <Link id="uploadImage" to="/admin/gallery/uploadImage">
          <AddAPhotoIcon
            id="uploadImageIcon"
            style={{ color: "blue", fontSize: "1.5em" }}
          />
        </Link> */}
        {ar ? (
          <div className="container">
            <h2 className="text-center display-3">גלריה</h2>
            <div className="container d-flex align-items-center">
            <TextField
            style={{marginRight:'10%'}}
              id="demo-helper-text-misaligned"
              helperText="חפש תמונה"
              type="text"
              label="חיפוש"
              onChange={translate}
            />
            </div>
            <hr />
            <div className="d-flex gap-5 p-5 flex-wrap justify-content-center ">
              {ar.map((item, i) => {
                return (
                  <>
                    <GalleryPhotos key={i} item={item} />
                  </>
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
