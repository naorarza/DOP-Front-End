import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./item";
import { useState } from "react";
import { apiGet } from "../services/apiServices";
import { MAIN_ROUTE } from "../constant/urls";
import { useEffect } from "react";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";

const CarouselComponent = () => {
  const [ar, setAr] = useState([]);
  const { theme, text } = useContext(AuthContext);
  useEffect(() => {
    doApiGet();
  }, []);

  const doApiGet = async () => {
    let url = MAIN_ROUTE + "products";
    try {
      const data = await apiGet(url);
      console.log(data);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfNewProduct = (product) => {
    if (!product.newProductDate || product.inMenu) {
      return false;
    }
    // Get the date from the server
    const serverDate = new Date(product.newProductDate); // Replace with the actual date received from the server

    // Get the current date
    const currentDate = new Date();

    // Compare the dates
    if (currentDate > serverDate) {
      return false;
    } else if (currentDate < serverDate) {
      return true;
    } else {
      return true;
    }
  };

  const filteredAr = ar.filter((product) => checkIfNewProduct(product));

  return (
    <div
      className="productsCarousel center"
      style={{ backgroundColor: theme, padding: "32px" }}
    >
      <h2 className="text-center pb-2"> מוצרים חדשים</h2>
      <hr />
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        // animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        
      >
        <Carousel
          NextIcon={<ArrowBackIosNewOutlined />}
          PrevIcon={<ArrowForwardIosOutlined />}
          prev={() => {
            /* previus product */
          }}
          next={() => {
            /* next product */
          }}
          stopAutoPlayOnHover
          duration={500}
          swipe
          navButtonsAlwaysVisible
        >
          {filteredAr.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </motion.div>
    </div>
  );
};

export default CarouselComponent;
