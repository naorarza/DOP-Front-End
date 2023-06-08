import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MAIN_ROUTE } from "../../constant/urls";
import { toast } from "react-toastify";
import { apiGet, apiPost } from "../../services/apiServices";
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
import AuthAdminComp from "../authAdminComp";
// import SelectItem from "./selectItem";
import { useEffect } from "react";
import AuthContext from "../../context/AuthContext";
// import { Select } from "antd";

export default function AddProductForm() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [selectValue, setSelectValue] = useState("");
  const [checkbox, setCheckBox] = useState(false);
  const { theme , text } = useContext(AuthContext);

  const handleChange = () => {
    setCheckBox((checkbox) => !checkbox);
    console.log(checkbox);
  };
  const [ar, setAr] = useState([]);

  useEffect(() => {
    console.log(selectValue);
    doApi();
  }, [selectValue]);

  const doApi = async () => {
    let url = MAIN_ROUTE + "categories";
    try {
      let data = await apiGet(url);
      console.log(data);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubForm = (_bodyData) => {
    checkbox && setSelectValue('');
    _bodyData.category = selectValue;
    console.log(_bodyData.category);
    
    doApiPost(_bodyData);
  };

  const doApiPost = async (_bodyData) => {
    const url = MAIN_ROUTE + "products/upload";
    price < 1 && toast.warn("המחיר שמילאת לא הגיונית!");
    if (price > 0) {
      try {
        const data = await apiPost(url, _bodyData);
        if (data.product_name) {
          toast.success("Product uploaded successfully!");
        } else {
          toast.error("Product upload failed!");
        }
      } catch (err) {
        console.log(err);
        price > 0 &&
          amount > 0 &&
          toast.warn("שים לב שמלאת את כל הפרטים כמו שצריך!");
      }
    }
  };

  return (
    <div style={{ background: theme , color:text }} className="d-flex justify-content-center">
      <AuthAdminComp />
      <div
        style={{ minHeight: "95vh" }}
        className="col-md-8 col-sm-8 col-10 d-flex align-items-center justify-content-center"
      >
        <form
        style={{border:`2px solid ${text}`}}
          className="rounded-3 p-3 w-100"
          onSubmit={handleSubmit(onSubForm)}
          id="id_form"
        >
          <h2 className="text-center">טופס העלאת מוצר חדש</h2>
          <hr />
          <div className="d-flex flex-wrap justify-content-md-between justify-content-sm-center justify-content-center">
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">
              <TextField
                {...register("product_name", {
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                })}
                helperText="הכנס שם מוצר"
                id="demo-helper-text-misaligned"
                label="שם מוצר"
              />
              {errors.product_name && (
                <div className="text-danger">* הכנס שם תקין</div>
              )}
            </div>
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">
              <TextField
                id="demo-helper-text-misaligned"
                label=" קישור לתמונה"
                helperText="הכנס קישור לתמונה"
                {...register("img_url", {
                  required: true,
                  minLength: 1,
                  maxLength: 999,
                })}
              />
              {errors.img_url && (
                <div className="text-danger">* הכנס קישור תקין</div>
              )}
            </div>
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">
              <TextField
                id="demo-helper-text-misaligned"
                label=" מחיר"
                helperText="הכנס מחיר למוצר"
                type="number"
                {...register("product_price", { minLength: 1, maxLength: 999 })}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              {errors.product_price && (
                <div className="text-danger">* הכנס מחיר תקין</div>
              )}
            </div>


            {/* <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">
              <TextField
                id="demo-helper-text-misaligned"
                label=" כמות"
                helperText="הכנס כמות מוצרים זמינים"
                type="number"
                {...register("amount_product", {
                  minLength: 1,
                  maxLength: 999,
                })}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
              {errors.amount_product && (
                <div className="text-danger">* הכנס כמות תקין</div>
              )}
            </div> */}

            
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">
              <TextField
                multiline
                minRows={3}
                id="demo-helper-text-misaligned"
                label="מידע על המוצר"
                helperText="הכנס מידע על המוצר"
                {...register("info", { minLength: 10, maxLength: 50 })}
              />
              {errors.info && (
                <div className="text-danger">* הכנס מידע תקין מעל 10 תווים</div>
              )}
            </div>
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">
              {checkbox && (
                <Box sx={{ minWidth: 150 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      קטגוריה
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectValue}
                      label="קטגוריה"
                      {...register("category", { })}
                      onChange={(e)=>{setSelectValue(e.target.value)}}
                    >
                      {ar.map((item) => {
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
            <div className="w-100 d-flex align-items-center justify-content-center">
              <label>האם המוצר קיים בתפריט?</label>
              <Checkbox
                type="checkbox"
                onClick={handleChange}
                {...label}
                {...register("inMenu", { type: "boolean" })}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              size="large"
              type="submit"
              color="success"
              variant="contained"
            >
              אישור
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
