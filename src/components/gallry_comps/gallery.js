import axios from "axios";
import React, { useEffect, useState } from "react";
import GalleryPhotos from "./galleryPhotos";
import { TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { motion } from "framer-motion";
import Loading from "../loading/loading";

export default function Gallery() {
  const [ar, setAr] = useState();
  const time = 0.1;
  const [searchQ, setSearchQ] = useState("pub");
  const { theme, text } = useContext(AuthContext);

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
      <div style={{ minHeight: "95vh", background: theme, color: text }}>
        {ar ? (
          <div className="container">
            <motion.h2
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center display-3"
            >
              גלריה
            </motion.h2>
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="container d-flex align-items-center"
            >
              <TextField
                style={{ marginRight: "10%" }}
                id="demo-helper-text-misaligned"
                helperText="חפש תמונה"
                type="text"
                label="חיפוש"
                onChange={translate}
              />
            </motion.div>
            <motion.hr initial={{ y: 30 }}
            animate={{ y:0 }}
            transition={{duration:.3}} />
            <div className="d-flex gap-5 p-5 flex-wrap justify-content-center ">
              {ar.map((item, i) => {
                return (
                  <>
                    <GalleryPhotos time={time + i / 10} key={i} item={item} />
                  </>
                );
              })}
            </div>
            {/* <ImageUploader/> */}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
