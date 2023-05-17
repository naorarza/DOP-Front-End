import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import { API_KEY } from '../constant/constants';
import { MAIN_ROUTE } from '../constant/urls';
import { apiGet } from '../services/apiServices';

// קומפנינטה שנשים באזורים שרק אדמין מותר לו להיות בהם
export default function AuthAdminComp() {
  const nav = useNavigate();
  
  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    const url = MAIN_ROUTE+"users/userInfo";
    try {
      const data = await apiGet(url);
      if(data.role != "admin" && data.role != 'owner'){
        localStorage.removeItem(API_KEY)
        window.location.reload();
        nav("/login");
        toast.error("אין לך גישה לשטח זה!")
        toast.info("ניתקנו אותך, עלייך להתחבר שוב כעת")
      }
    } catch (error) {
      console.log(error);
      nav("/login");
      localStorage.removeItem(API_KEY)
      window.location.reload();
      toast.error("משהו השתבש אבל אתה יכול להתחבר ולנסות שוב");
    }
  }

  return (
    <React.Fragment></React.Fragment> 
  )
}
