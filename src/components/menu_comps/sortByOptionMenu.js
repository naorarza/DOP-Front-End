import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet } from "../../services/apiServices";
import { useEffect } from "react";
import SelectCategories from "./selectCategories";

export default function SortByOptionMenu(props) {
  const [sortOrder, setSortOrder] = useState("low");
  const [showCat, setShowCat] = useState(false);
  const ar = props.ar;
  const [catAr, setCatAr] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  const handleSort = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    let sortedProducts = [...ar].sort((a, b) => {
      if (newSortOrder === "low") {
        return a.product_price - b.product_price;
      } else if (newSortOrder === "high") {
        return b.product_price - a.product_price;
      }
    });
    if (newSortOrder === "category") {
      setShowCat(true);
    }else{
      setShowCat(false)
    }
    props.setFilteredProducts(sortedProducts);
    if (newSortOrder === "") {
      props.setFilteredProducts(props.ar);
    }
  };

 

  useEffect(() => {
    doApiCategories();
  }, []);

  const doApiCategories = async () => {
    let url = MAIN_ROUTE + "categories";
    try {
      let data = await apiGet(url);
      setCatAr(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">מיון</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.product}
          label="מיון"
          onChange={handleSort}
        >
          <MenuItem value="">
            <em>ללא</em>
          </MenuItem>
          <MenuItem value="category">לפי קטגוריה</MenuItem>
          <MenuItem value="low">מהמחיר הנמוך לגבוה</MenuItem>
          <MenuItem value="high">מהמחיר הגבוה לנמוך</MenuItem>
        </Select>
      </FormControl>
    </Box>
    {showCat && 
      <SelectCategories
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        catAr={catAr}
        productsAr={props.ar}
        setFilteredProducts={props.setFilteredProducts}
      />
      }
    </div>
  );
}
