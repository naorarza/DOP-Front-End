import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MAIN_ROUTE } from "../../constant/urls";
import { toast } from "react-toastify";
import { apiGet, apiPut } from "../../services/apiServices";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect } from "react";

export default function EditProductForm(props) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const item = props.item;
  const [price, setPrice] = useState(item.product_price);
  const [amount, setAmount] = useState(item.amount_product);
  const [littleImage, setLittleImage] = useState(item.img_url);
  const { register, handleSubmit , formState: { errors } } = useForm();
  const [checkbox, setCheckBox] = useState(item.inMenu);
  const [catValue, setCatValue] = useState("");

  const onSubForm = (_bodyData) => {
    checkbox && setSelectValue("");
    doApiPut(item._id, _bodyData);
  };

  const [selectValue, setSelectValue] = useState(item.category);

  const handleChange = () => {
    setCheckBox((checkbox) => !checkbox);
    console.log(checkbox);
  };

  const changeImage = (event) => {
    setLittleImage(event.target.value);
  };

  

  useEffect(() => {
    console.log(checkbox);
    item.category !== "" && setCatValue(item.category);
  }, []);

  const doApiPut = async (_id, _bodyData) => {
    const validAmount = price > 0;
    if (validAmount) {
      const url = MAIN_ROUTE + "products/" + _id;
      try {
        const data = await apiPut(url, _bodyData);
        if (data.modifiedCount) {
          toast.success("המוצר עודכן בהצלחה!");
          props.refresh();
          props.handleClose();
        } else {
          toast.error("עדכון המוצר נכשל!");
        }
      } catch (err) {
        console.log(err);
        toast.warn("אירעה שגיאה!");
      }
    } else {
      toast.warn("הכמות או המחיר נמוך מידיי!");
    }
  };

  return (
    <form className="p-3 w-100" onSubmit={handleSubmit(onSubForm)} id="id_form">
      <h2 className="text-center">עדכון פרטי מוצר</h2>
      <hr />
      <div className="d-flex flex-wrap justify-content-between">
        <div className="w-50 d-flex justify-content-center">
          <TextField
            {...register("product_name", {
              maxLength: 50,
            })}
            defaultValue={item.product_name}
            helperText="הכנס שם מוצר"
            id="demo-helper-text-misaligned"
            label="שם מוצר"
          />
        </div>
        <div className="w-50 d-flex flex-column justify-content-center mb-3">
          <TextField
            defaultValue={item.img_url}
            id="demo-helper-text-misaligned"
            label=" קישור לתמונה"
            helperText="הכנס קישור לתמונה"
            onInput={changeImage}
            {...register("img_url", {
              maxLength: 999,
            })}
          />
          <img
            src={littleImage}
            alt="product"
            className="float-end col-md-5 rounded-3"
          />
        </div>
        <div className="w-50 d-flex justify-content-center">
          <TextField
            defaultValue={item.info}
            multiline
            minRows={3}
            id="demo-helper-text-misaligned"
            label="מידע על המוצר"
            helperText="הכנס מידע על המוצר"
            {...register("info", { minLength: 10 , maxLength: 50 })}
          />
          {errors.info && (
                <div className="text-danger">* הכנס מידע תקין מעל 10 תווים</div>
              )}
        </div>
        <div className="w-50 d-flex justify-content-center">
          <TextField
            defaultValue={item.product_price}
            id="demo-helper-text-misaligned"
            label=" מחיר"
            helperText="הכנס מחיר למוצר"
            type="number"
            {...register("product_price", { maxLength: 999 })}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        {/* <div className="w-50 d-flex justify-content-center">
          <TextField
            defaultValue={item.amount_product}
            id="demo-helper-text-misaligned"
            label=" כמות"
            helperText="הכנס כמות מוצרים זמינים"
            type="number"
            {...register("amount_product", {
              maxLength: 999,
            })}
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div> */}
       
        <div className="w-50 d-flex justify-content-center">
          {checkbox && (
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectValue}
                  label="קטגוריה"
                  {...register("category", {})}
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}
                >
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
          )}
        </div>
        {item.inMenu ? (
          <div className="w-100 d-flex align-items-center justify-content-center">
            <label>האם המוצר קיים בתפריט?</label>
            <Checkbox
              sx={{
                color: green[800],
                "&.Mui-checked": {
                  color: green[600],
                },
              }}
              defaultChecked
              type="checkbox"
              onClick={handleChange}
              {...label}
              {...register("inMenu", { type: "boolean" })}
            />
          </div>
        ) : (
          <div className="w-100 d-flex align-items-center justify-content-center">
            <label>האם המוצר קיים בתפריט?</label>
            <Checkbox
              type="checkbox"
              {...label}
              sx={{
                color: green[800],
                "&.Mui-checked": {
                  color: green[600],
                },
              }}
                onClick={handleChange}
              {...register("inMenu", { type: "boolean" })}
            />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center">
        <Button size="large" type="submit" color="info" variant="contained">
          עדכון
        </Button>
      </div>
    </form>
  );
}
