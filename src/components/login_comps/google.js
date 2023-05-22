import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../../constant/urls";
import { API_KEY } from "../../constant/constants";
import { apiPostGoogle } from "../../services/apiServices";
import { toast } from "react-toastify";

export default function Google() {
  const {
    mutate,
    refreshCart,
    setGoogleEmail,
    setGoogleName,
    setGoogleProfileImg,
    setGoogleSub,
  } = useContext(AuthContext);

  const nav = useNavigate();


  const decodeToken = (data) => {
    const token = data;
    const decodedToken = jwtDecode(token);
    setGoogleEmail(decodedToken.email);
    setGoogleName(decodedToken.name);
    setGoogleProfileImg(decodedToken.picture);
    setGoogleSub(decodedToken.sub);
    onSubForm(decodedToken.sub);
  };

  const onSubForm = async (_bodyData) => {
    let url = MAIN_ROUTE + "users/loginGoogle";
    try {
      let data = await apiPostGoogle(url , {sub:_bodyData});
      console.log(data);
      localStorage.setItem(API_KEY, data.token);
      toast.success("התחברת בהצלחה!");
      refreshCart();
      mutate();
      nav("/");
    } catch (error) {
      console.log(error);
      nav('/signup/google')
    }
  };

  return (
    <GoogleLogin
      onSuccess={(data) => {
        decodeToken(data.credential);
      }}
      useOneTap
      theme="filled_blue"
      text="signin_with"
      shape="pill"
      width="300px"
      type="standard"
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
