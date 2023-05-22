import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { apiGet, apiPost } from "../../services/apiServices";
import { MAIN_ROUTE } from "../../constant/urls";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Box, Button, CircularProgress } from "@mui/material";
import "./cart.css";
import { Checkbox } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const { theme, text, cartPrice , mutate , refreshCart , productsInCart } = useContext(AuthContext);
  const [isPresent, setIsPresent] = useState(false);
  const [bodyDataSave, setBodyDataSave] = useState([]);
  const nav = useNavigate();

  const onChange = (e) => {
    setIsPresent(e.target.checked);
    if (productsInCart < 1) {
        nav("/");
        toast.info("העגלה ריקה, עליך לבחור לפחות פריט אחד על מנת לגשת אליה");
      }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubForm = (_bodyData) => {
    _bodyData.isPresent = isPresent;
    _bodyData.order_price = Number(cartPrice);
    setBodyDataSave(_bodyData);
    doApiPostOrder(_bodyData)
    // console.log(_bodyData);
  };

  useEffect(() => {
    console.log(bodyDataSave);
  }, [bodyDataSave]);

  const doApiPostOrder = async (_bodyData) => {
    const url = MAIN_ROUTE + "orders";
    console.log(bodyDataSave);
    const data = await apiPost(url, _bodyData);
    refreshCart();
    mutate();
    nav('/')
    console.log(data);
  };

  return (
    <div
      className=""
      style={{
        minHeight: "95vh",
        background: theme === "#fff" ? "#262b2f" : "#fff",
        color: text === "#fff" ? "#262b2f" : "#fff",
      }}
    >
      <h2 className="text-center p-4">תשלום וסיום רכישה</h2>
      <hr
        style={{ color: text === "#fff" ? "#262b2f" : "#fff" }}
        className="pb-4"
      />
      <div
        style={{
          minHeight: "450px",
          background: theme === "#fff" ? "#262b2f" : "#fff",
          border: `2px solid ${theme === "#262b2f" ? "#fff" : "#262b2f"}`,
        }}
        className="container justify-content-between flex-column d-flex align-items-center rounded-2"
      >
        <form
          className="border border-dark border-2 rounded-2 p-4"
          onSubmit={handleSubmit(onSubForm)}
          id="id_form"
        >
          <h3>טופס למשלוח במידה וזה לא לכתובת ששמורה בפרופיל שלך</h3>
          <p>* אם הכתובת בפרופיל שלך היא הכתובת הרצויה נא לא למלא כלום *</p>
          <label>עיר</label>
          <input
            {...register("city", {})}
            className="form-control"
            type="text"
          />
          {errors.city && <div className="text-danger">* Enter valid city</div>}
          <label>כתובת</label>
          <input
            {...register("address", {})}
            className="form-control"
            type="text"
          />
          {errors.address && (
            <div className="text-danger">* Enter valid address</div>
          )}
          <label>הודעה לשליח</label>
          <input
            {...register("delivery_msg", {})}
            className="form-control"
            type="text"
          />
          {errors.delivery_msg && (
            <div className="text-danger">* Enter valid delivery_msg</div>
          )}
          <label>טלפון</label>
          <input
            {...register("phone", {})}
            className="form-control"
            type="tel"
          />
          {errors.phone && (
            <div className="text-danger">* Enter valid phone</div>
          )}
          <div className="pt-2">
            <Checkbox
              {...register("isPresent", {})}
              type="checkbox"
              onChange={onChange}
            ></Checkbox>
            <label className="me-2">האם זו מתנה?</label>
            {errors.isPresent && (
              <div className="text-danger">* Enter valid isPresent</div>
            )}
          </div>
          <br />
          <div className="d-flex align-items-center justify-content-center">
            <Button type="submit" variant="contained" color="success">
              אישור
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center d-flex pt-5 flex-column justify-content-center align-items-center">
        {Number(cartPrice) > 1.5 ? (
          <PayPalScriptProvider
            options={{
              "client-id":
                "AQ_P5k_n2Wq-RUy-b6LelJboRWleBXQAX3rKVKGWycG-wwCYSaHyAOxky5MkWMuPT-nAFhnctDNCise7",
            }}
            style={{ width: "250px" }}
          >
            <PayPalButtons
              onClick={() => {
                console.log(cartPrice);
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: cartPrice,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  toast.success(
                    "הרכישה בוצעה בהצלחה על ידי: " + details.payer.name.given_name
                  );
                  doApiPostOrder({'isPresent':isPresent , 'order_price':cartPrice});
                });
              }}
              style={{ color: "blue", label: "checkout" }}
            />
          </PayPalScriptProvider>
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
}
