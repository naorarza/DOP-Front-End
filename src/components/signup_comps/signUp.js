import axios from "axios";
import "./light_box.css"
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dob from "../dob";
import { MAIN_ROUTE } from "../../constant/urls";

export default function SignUp() {

  const [date, setDate] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const nav = useNavigate();
  const onSubForm = (_bodyData) => {
    if(date != null) {
    _bodyData.dob = date.toString();
    delete _bodyData.cpassword;
    doApiPost(_bodyData);
    }

    else{
      toast.warning("תאריך הלידה שהכנסת לא תקין")
    }

  };

  const doApiPost = async (_bodyData) => {
    if (_bodyData.password.length < 3) {
      return toast.warn("your password need to be more than 2");
    }
    let myUrl = MAIN_ROUTE + "users";
    try {
      let resp = await axios({
        method: "POST",
        data: _bodyData,
        url: myUrl,
      });
      if (resp.data._id) {
        toast.success("נרשמת בהצלחה!");
        nav("/login");
      }
    } catch (err) {
      console.log(err.response.data.msg);
      toast.warning(err.response.data.msg);
    }
  };
  return (
    <div className={`light_box align-items-center `} style={{ color: "white", minHeight: "100vh" }}>
      <div style={{ border: "3px solid #fff", maxWidth: "400px" }} className="inside_box rounded-3 container mt-5 mb-5 ">
        <h2 className="text-center mt-2">הרשמה</h2>
        <hr />
        <form
          className=" container text-center d-flex flex-column gap-2 "
          onSubmit={handleSubmit(onSubForm)}
          id="id_form"
        >
          <div className="d-flex justify-content-between mt-3">
            <div className="divs">
              <label>שם מלא</label>
              <input
                {...register("name", { required: true, minLength: 2 })}
                className="form-control"
                type="text"
              />
              {errors.name && (
                <div className="text-danger">* הכנס שם תקין מעל 2 תווים</div>
              )}
              <label>אימייל</label>
              <input
                {...register("email", {
                  required: true,
                  pattern: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                className="form-control"
                type="text"
              />
              {errors.email && <div className="text-danger">* הכנס אימייל תקין</div>}
              <label>תאריך לידה</label>
              <Dob setDate={setDate} />
              
              <label>כתובת</label>
              <input
                {...register("address", { required: true, minLength: 2 })}
                className="form-control"
                type="text"
              />
              {errors.address && (
                <div className="text-danger">* הכנס כתובת תקינה</div>
              )}
              <label>סיסמא</label>
              <input
                {...register("password", { required: true })}
                className="form-control"
                type="password"
              />
              {errors.password && (
                <div className="text-danger">* הכנס סיסמא תקינה</div>
              )}



            </div>
            <div className="divs">

              <label>שם משתמש</label>
              <input
                {...register("username", { required: true, minLength: 2 })}
                className="form-control"
                type="text"
              />
              {errors.username && (
                <div className="text-danger">* הכנס שם משתמש תקין מעל 2 תווים</div>
              )}
              <label>טלפון</label>
              <input
                {...register("phone", { required: true, minLength: 2 })}
                className="form-control"
                type="text"
              />
              {errors.phone && <div className="text-danger">* הכנס טלפון תקין</div>}
              <label>עיר</label>
              <input
                {...register("city", { required: true, minLength: 2 })}
                className="form-control"
                type="text"
              />
              {errors.city && <div className="text-danger">* הכנס עיר תקינה</div>}
              <label>מיקוד</label>
              <input
                {...register("postal_code", { required: true, minLength: 2 })}
                className="form-control"
                type="number"
              />
              {errors.postal_code && (
                <div className="text-danger">* הכנס מיקוד תקין</div>
              )}
              <label>אימות סיסמא</label>
              <input
                {...register("cpassword", {
                  required: "**Password is required",
                  validate: (value) => value === watch("password"),
                })}
                className="form-control"
                type="password"
              />
              {errors.cpassword && (
                <div className="text-danger">* הכנס את אותה סיסמא תקינה</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="mt-4 mb-2 btn btn-info ">הרשם</button>
          </div>
          <Link className="text-decoration-none mt-4 text-end" style={{ cursor: "pointer" }} to={"/login"} >יש לך כבר משתמש?</Link>
        </form>
      </div>
    </div>
  );
}
