import React from "react";
import { useState } from "react";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet, doApiDelete } from "../../services/apiServices";
import { useEffect } from "react";
import AuthAdminComp from "../authAdminComp";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Loading from "../../components/loading/loading";
import { motion } from "framer-motion";
import "./events.css";
import { DeleteOutline } from "@mui/icons-material";
import { toast } from "react-toastify";
import DeleteDialog from "./deleteDialog";

export default function AdminEvents() {
  const [ar, setAr] = useState([]);
  const { theme, text } = useContext(AuthContext);
  let time = 0.1;

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = MAIN_ROUTE + "events";
    try {
      const data = await apiGet(url);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  const doApiDeleteEvent = async (eventId) => {
    let url = MAIN_ROUTE + "events/" + eventId;
    try {
      const data = await doApiDelete(url);
      console.log(data);
      doApi();
      toast.success('האירוע נמחק בהצלחה');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthAdminComp />
      {ar.length > 0 ? (
        <div style={{ minHeight: "95vh", background: theme, color: text }}>
          <h2 className="text-center display-4">פאנל בקשות לאירועים</h2>
          <hr />
          <div style={{ minHeight: "95vh" }} className="container-fluid pb-3">
            <div
              //   style={{ minHeight: "95vh" }}
              className="d-flex flex-wrap justify-content-center"
            >
              {ar.map((item, i) => {
                return (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: time + i / 10 }}
                    style={{
                      border: `2px solid ${text}`,
                      color: text,
                      background: theme,
                      fontSize: "1.3em",
                    }}
                    className="eventParent"
                  >
                    {/* style={{color:text,backgroundColor:theme}}  */}
                    <p style={{ wordBreak: "break-word" }} className="m-0 p-0">
                      שם: {item.name}
                    </p>
                    <p style={{ wordBreak: "break-word" }} className="m-0 p-0">
                      טלפון: {item.phone}
                    </p>
                    {/* <p className="ms-2">האם נמצא בתפריט: {product.inMenu}</p> */}
                    <Tooltip title={item.email}>
                      <p
                        style={{ wordBreak: "break-word" }}
                        className="m-0 p-0"
                      >
                        אימייל:{item.email}
                      </p>
                    </Tooltip>
                    <p style={{ wordBreak: "break-word" }} className="m-0 p-0">
                      מידע על האירוע: {item.text}
                    </p>
                    <DeleteDialog doApi={doApi} item={item}/>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
