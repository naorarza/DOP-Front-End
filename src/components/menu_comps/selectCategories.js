import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function SelectCategories(props) {
  
    

  const handleChange = (event) => {
    props.setSelectValue(event.target.value);

    const filteredProducts = event.target.value === "All"
    ? props.productsAr
    :  props.productsAr.filter(product => product.category === event.target.value);
    props.setFilteredProducts(filteredProducts)
  };

  return (
    <div className="me-3">
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.selectValue}
            label="קטגוריה"
            onChange={handleChange}
          >
          <MenuItem key='123' value='All'>
                  הכל
                </MenuItem>
            {props.catAr.map((item) => {
              return (
                <MenuItem key={item._id} value={item.type}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
