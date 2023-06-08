import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { apiGet } from "../../services/apiServices";
import { MAIN_ROUTE } from "../../constant/urls";
import AuthContext from "../../context/AuthContext";
import UserTableAnt from "./components/ordersTableAnt";
import { ConfigProvider } from "antd";
import AuthAdminComp from "../authAdminComp";
import Loading from "../../components/loading/loading";

export default function OrdersList() {
  const [ordersAr, setOrdersAr] = useState([]);
  const { user, theme, text } = useContext(AuthContext);


  useEffect(() => {
    doApiOrders();
    setNumRole(checkRole(user?.role));
  }, [user]);

  const [numRole, setNumRole] = useState(0);

  const checkRole = (role) => {
    let num = 0;
    switch (role) {
      case "user":
        num = 1;
        break;
      case "admin":
        num = 2;
        break;
      case "owner":
        num = 3;
        break;
      default:
        break;
    }
    return num;
  };

  const doApiOrders = async () => {
    const url = MAIN_ROUTE + "orders";
    try {
      const data = await apiGet(url);
      setOrdersAr(data);
    } catch (err) {
      toast.warn(err.response.data.msg);
    }
  };

  const fixedDate = (_date) => {
    const date = new Date(_date);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <>
          <AuthAdminComp />
      {ordersAr.length > 0 ? (
        <div style={{ minHeight: "95vh", background: theme, color: text }}>
          <h2 className="text-center display-6">ניהול הזמנות</h2>
          <hr style={{ color: text }} />
          <div className="d-flex justify-content-center p-4">
            <ConfigProvider direction="rtl">
              <UserTableAnt
                doApiOrders={doApiOrders}
                ordersAr={ordersAr}
                setOrdersAr={setOrdersAr}
                fixedDate={fixedDate}
                numRole={numRole}
              />
            </ConfigProvider>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
