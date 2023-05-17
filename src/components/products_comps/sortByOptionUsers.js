import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function SortByOptionUsers(props) {
    
    const [sortOrder, setSortOrder] = useState("low");
    const ar = props.ar;


    const handleSort = (event) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
        let sortedProducts = [...ar].sort((a, b) => {
          if (newSortOrder === "low") {
            return a.product_price - b.product_price;
          } else if(newSortOrder === "high"){
            return b.product_price - a.product_price;
        } 
      });
            props.setFilteredProducts(sortedProducts);
            if(newSortOrder === ""){
                props.setFilteredProducts(props.ar);
            }
      };

  return (
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
          <MenuItem value="low">מהמחיר הנמוך לגבוה</MenuItem>
          <MenuItem value="high">מהמחיר הגבוה לנמוך</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}