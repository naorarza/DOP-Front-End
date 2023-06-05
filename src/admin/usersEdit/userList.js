import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { apiGet } from "../../services/apiServices";
import { useSearchParams } from "react-router-dom";
import { MAIN_ROUTE } from "../../constant/urls";
import AuthContext from "../../context/AuthContext";
import UserTableAnt from "./components/userTableAnt";
import { ConfigProvider } from "antd";
import "./components/userLists.css";
import AuthAdminComp from "../authAdminComp";
import Loading from "../../components/loading/loading";

export default function UserList() {
  const [ar, setAr] = useState([]);
  const [query] = useSearchParams();
  const { user, theme, text } = useContext(AuthContext);

  useEffect(() => {
    doApi();
  }, [query]);

  useEffect(() => {
    doApi();
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

  const doApi = async () => {
    const url = MAIN_ROUTE + "users/usersListAll";
    try {
      const data = await apiGet(url);
      setAr(data);
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
      {ar.length > 0 ? (
        <div style={{ minHeight: "95vh", background: theme, color: text }}>
          <AuthAdminComp />
          <h2 className="text-center display-6">טבלת משתמשים</h2>
          <hr style={{ color: text }} />
          <div className="d-flex justify-content-center">
            <div className="col-md-8 p-4 phoneScreen">
              <ConfigProvider direction="rtl">
                <UserTableAnt
                  ar={ar}
                  setAr={setAr}
                  fixedDate={fixedDate}
                  doApi={doApi}
                  numRole={numRole}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
