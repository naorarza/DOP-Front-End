import { ListAlt } from "@mui/icons-material";
import React from "react";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { MAIN_ROUTE } from "../../../constant/urls";
import { toast } from "react-toastify";
import { apiGet } from "../../../services/apiServices";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../loading/loading";
import OrderItem from "./orderItem";

export default function History() {
  const { text, theme, user } = useContext(AuthContext);
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyOrders = async () => {
    const url = MAIN_ROUTE + "orders/" + user._id;
    try {
      const data = await apiGet(url);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      setAr(data);
      setLoading(false);
    } catch (error) {
      toast.warning("משהו השתבש אנא נסה שוב!");
      console.log(error);
    }
  };

  useEffect(() => {
    user !== null && getMyOrders();
  }, [user]);

  return (
    <>
      {!loading ? (
        <div
          style={{
            transition: "0.3s ease-out",
            minHeight: "95vh",
            background: theme,
            color: text,
          }}
        >
          <h2 className="text-center display-4 p-3">
            {" "}
            פרופיל | הזמנות <ListAlt fontSize="inherit" />
          </h2>
          <hr style={{ color: text }} />
          <div className="fs-5 d-flex justify-content-center pb-5">
            <div className="p-0 center col-8 border border-2 border-info rounded-3">
              <table
                className="table rounded-3"
                style={{ color: text, background: theme }}
              >
                <caption className="text-center">רשימת הזמנות</caption>
                <thead>
                  <tr className="text-center">
                    <th scope="col">#</th>
                    <th scope="col">תאריך הזמנה</th>
                    <th scope="col">סכום תשלום</th>
                    <th scope="col">צפייה בהזמנה</th>
                  </tr>
                </thead>
                <tbody>
                  {ar.length > 0 ? (
                    ar.map((item, i) => {
                      return <OrderItem item={item} key={i} number={i + 1} />;
                    })
                  ) : (
                    <h2>לא קיימות הזמנות קודמות</h2>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
