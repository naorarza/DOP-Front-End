import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_KEY } from "../../constant/constants";
import { LOGIN_ROUTE } from "../../constant/urls";
import AuthContext from "../../context/AuthContext";
import { apiPost } from "../../services/apiServices";
import LoginForm from "./loginForm";
import Swal from "sweetalert2";
import { useState } from "react";


export default function Login() {
  const nav = useNavigate();

  const { user, mutate , refreshCart } = useContext(AuthContext);

  useEffect(() => {
    if (user != null) {
      refreshCart();
      nav("/");
      toast.info("אתה מחובר כבר");
      mutate();
    } else {
      nav("/login");
    }
  }, [user]);



  const onSubForm = async (_bodyData) => {
    let data = await apiPost(LOGIN_ROUTE, _bodyData);
    localStorage.setItem(API_KEY, data.token);
    toast.success("התחברת בהצלחה!");
    refreshCart();
    mutate();
    nav("/");
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{ background: "#313131", color: "white", minHeight: "95vh" }}
    >
      <LoginForm onSubForm={onSubForm}/>
    </div>
  );
}
