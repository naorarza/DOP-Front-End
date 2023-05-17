import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import SelectCategoriesAdmin from "./selectCategoriesAdmin";
import { useEffect } from "react";
import { apiGet } from "../../services/apiServices";
import { MAIN_ROUTE } from "../../constant/urls";

export default function SortByOption(props) {
  const ar = props.ar;
  const [selectValue, setSelectValue] = useState("");
  const [showCat, setShowCat] = useState(false);
  const [catAr, setCatAr] = useState([]);
  const [menuAr, setMenuAr] = useState([]);

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

  const handleSort = (event) => {
    const newSortOrder = event.target.value;
    let sortedProducts = [...ar].sort((a, b) => {
      if (newSortOrder === "low") {
        return a.product_price - b.product_price;
      } else if (newSortOrder === "high") {
        return b.product_price - a.product_price;
      }
    });
    if (newSortOrder === "inMenu") {
      sortedProducts = ar.filter((item) => item.inMenu);
      setMenuAr(sortedProducts)
      setShowCat(true);
    } else {
      setShowCat(false);
    }
    if (newSortOrder === "NotinMenu") {
      sortedProducts = ar.filter((item) => !item.inMenu);
    }
    props.setFilteredProducts(sortedProducts);
    if (newSortOrder === "") {
      props.setFilteredProducts(props.ar);
    }
  };

  return (
    <div className="d-flex">
      <Box sx={{ minWidth: 150 }}>
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
            <MenuItem value="NotinMenu">מוצרים</MenuItem>
            <MenuItem value="inMenu">תפריט</MenuItem>
            <MenuItem value="low">מהמחיר הנמוך לגבוה</MenuItem>
            <MenuItem value="high">מהמחיר הגבוה לנמוך</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {showCat && (
        <SelectCategoriesAdmin
          selectValue={selectValue}
          setSelectValue={setSelectValue}
          catAr={catAr}
          productsAr={menuAr}
          setFilteredProducts={props.setFilteredProducts}
        />
      )}
    </div>
  );
}
