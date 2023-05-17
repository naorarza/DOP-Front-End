import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import DataBox from "./dataBox";
import { toast } from "react-toastify";
import { API_KEY } from "../../constant/constants";

export default function Profile() {
  const { user , theme , text } = useContext(AuthContext);

  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage[API_KEY]) {
      nav("/");
      toast.info("אתה צריך להתחבר לפני שאתה ניגש לפרופיל!");
    }
  }, [user]);

  return (
    <div style={{ minHeight: "95vh", background: theme, color: text }}>
      <h2 className="text-center display-4 p-3">פרופיל</h2>
      <div className="fs-5 d-flex justify-content-center pb-5">
        <DataBox />
      </div>
    </div>
  );
}
