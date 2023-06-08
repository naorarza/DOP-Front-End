import React from "react";
import { useForm } from "react-hook-form";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiPost } from "../../services/apiServices";
import AuthAdminComp from "../authAdminComp";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function AddCategorieForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {theme, text} = useContext(AuthContext)

  const onSubForm = (_bodyData) => {
    doApiPost(_bodyData);
  };

  const nav = useNavigate();

  const doApiPost = async (_bodyData) => {
    const url = MAIN_ROUTE + "categories";
    try {
      let data = await apiPost(url, _bodyData);
      nav(-1)
      toast.success('הקטגוריה התווספה בהצלחה!')
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: theme , color:text}} className="d-flex justify-content-center">
      <AuthAdminComp />
      <div
        style={{ minHeight: "95vh" }}
        className="col-md-8 col-sm-8 col-10 d-flex align-items-center justify-content-center"
      >
        <form
          onSubmit={handleSubmit(onSubForm)}
          id="id_form"
          style={{border:`2px solid ${text}`}}
          className=" rounded-3 p-3 w-100"
        >
          <h2 className="text-center">טופס להוספת קטגוריה</h2>
          <hr />
          <div className="d-flex flex-wrap justify-content-md-between justify-content-sm-center justify-content-center">
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">
              <TextField
                {...register("name", {
                  required: true,
                  minLength: 2,
                })}
                helperText="הכנס שם קטגוריה"
                id="demo-helper-text-misaligned"
                label="שם קטגוריה"
              />
              {errors.name && <div className="text-danger">* הכנס שם תקין</div>}
            </div>
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">
            <TextField
              {...register("code_url", {
                required: true,
                minLength: 2,
              })}
              helperText="הכנס קוד קטגוריה"
              id="demo-helper-text-misaligned"
              label="קוד קטגוריה"
            />
            {errors.code_url && (
              <div className="text-danger">* הכנס קוד קטגוריה תקין</div>
            )}
            </div>
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">

            <TextField
              id="demo-helper-text-misaligned"
              label="סוג הקטגוריה"
              helperText="הכנס סוג קטגוריה"
              {...register("type", { required: true, minLength: 2 })}
            />
            {errors.type && <div className="text-danger">* הכנס סוג</div>}
            </div>
            <div className="col-md-5 col-sm-7 me-3 d-flex justify-content-center">

            <TextField
              multiline
              minRows={3}
              id="demo-helper-text-misaligned"
              label="מידע על הקטגוריה"
              helperText="הכנס מידע על הקטגוריה"
              {...register("info", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
            />
            {errors.info && <div className="text-danger">* הכנס מידע תקין</div>}
            </div>
          </div>
          <div className="d-flex justify-content-center m-3">
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
