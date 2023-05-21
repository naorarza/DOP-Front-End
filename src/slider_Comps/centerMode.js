import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./slider.css";
import { Button } from "@mui/material";
import { MAIN_ROUTE } from "../constant/urls";
import { apiGet } from "../services/apiServices";
import { useNavigate } from "react-router-dom";

export const CenterMode = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [ar,setAr] = useState([]);

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
    if (!product.newProductDate) {
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
  const nav = useNavigate();

  

  return (
    <div style={{ backgroundColor: "#31313131", padding: "32px" }}>
      <h2 className="text-center pb-2"> מוצרים חדשים</h2>
      <hr />
      <Slider {...settings}>
        {filteredAr.map((item) => {
          return (
            <div className="text-center me-2 slide-item">
              <div className='slide-inner'>
                <img src={item.img_url} alt="" />
                {/* <div className="none"> */}
                <p style={{ color: "#fff", margin: "0", padding: "0" }}>
                  {item.product_name}
                </p>
                <Button onClick={()=> {nav('/product/'+item._id)}} size="small" variant="contained" color="success">
                  צפייה במוצר
                </Button>
                {/* </div> */}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
