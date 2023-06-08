import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MAIN_ROUTE } from "../../../constant/urls";
import { apiGet } from "../../../services/apiServices";
import AuthContext from "../../../context/AuthContext";
import ProductList from "./products.js/productlList";
import "./order.css";

export default function OrderDetails() {
  const { theme, text } = useContext(AuthContext);
  let params = useParams();
  const [ar, setAr] = useState([]);
  const [info, setInfo] = useState([]);
  console.log(params.id);

  const findOrder = async () => {
    const url = MAIN_ROUTE + "orders/single/" + params.id;
    try {
      const data = await apiGet(url);
      console.log(data);
      setAr(data.products_ar);
      setInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findOrder();
    console.log(ar);
  }, []);

  const fixedDate = (_date) => {
    const date = new Date(_date);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <div
      style={{
        transition: "0.3s ease-out",
        minHeight: "95vh",
        width: "100%",
        background: theme,
        color: text,
      }}
      className="d-flex flex-wrap justify-content-center"
    >
      <div
        className="rightDiv d-flex flex-column col-md-6 col-sm-10 align-items-center col-lg-6 text-center"
        style={{
          padding: "6px",
          // width: "50%",
          boxShadow: "5px 5px 15px 5px #000000",
          color: "white",
        }}
      >
        <div>
          <h2>פרטי ההזמנה</h2>
          <hr />
          <h4>שם מבצע ההזמנה: {info.name}</h4>
          <h4>ההזמנה בוצעה לעיר: {info.city}</h4>
          <h4>ההזמנה בוצעה לכתובת: {info.address}</h4>
          <h4>ההזמנה בוצעה בתאריך: {fixedDate(info.order_date)}</h4>
          {info.isPresent ? (
            <h4>הוזמנה כמתנה</h4>
          ) : (
            <h4>הזמנה רגילה(לא מתנה)</h4>
          )}
          {/* {info.delivery_msg.length > 0 && <h4>הודעה לשליח: {info.delivery_msg}</h4>} */}
        </div>
      </div>
      <div className="col-md-6 col-sm-9 col-lg-6" style={{ minHeight: "95vh" }}>
        <ProductList ar={ar} />
      </div>
    </div>
  );
}
