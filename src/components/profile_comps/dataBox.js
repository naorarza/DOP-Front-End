import React from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ListAlt, Settings, ShoppingCart } from "@mui/icons-material";
import UploadImage from "./uploadImage";
import "./upload.css";
import ConnectGoogle from "./connectGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../../constant/urls";
import { OrderedListOutlined } from "@ant-design/icons";

export default function DataBox() {
  // cart
  // :
  // (2) [{…}, {…}]

  // role
  // :
  // "admin"

  const { productsInCart , user, isAdmin , text } = useContext(AuthContext);

  function flipDateOrder(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  const nav = useNavigate();

  const [changing, setChanging] = useState();
  return (
    <>
      
        <div
          style={{ minWidth: "70%" }}
          className="border p-3 rounded-3 border-info border-2"
        >
            <h2 className="text-center display-4">מידע משתמש</h2>
            <div className="d-flex justify-content-between p-4">
            <Tooltip title="מעבר להסטוריית הזמנות">
              <button style={{border:`2px solid ${text}`}} id="ordersBtn" onClick={()=>{nav('/profile/orders')}}>
                <ListAlt />
              </button>
            </Tooltip>
            <Tooltip title="מעבר להגדרות פרופיל">
              <button style={{border:`2px solid ${text}`}} id="settingsBtn" onClick={()=>{nav('/profile/settings')}}>
                <Settings />
              </button>
            </Tooltip>
            </div>
          <div className="d-flex flex-column justify-content-center text-center align-items-center gap-3">
            {!changing ? (
              <img id="my-avatar" src={user.profile_img} alt="profile_img" />
            ) : (
              <img
                id="my-avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Killing_field_on_the_circle.gif"
                alt="profile_img"
              />
            )}
            <UploadImage setChanging={setChanging} />
          </div>
          {!user.googleSub && (
            <div className="d-flex flex-column align-items-start justify-content-start">
              <p>קישור חשבון הגוגל שלך:</p>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <ConnectGoogle />
              </GoogleOAuthProvider>
            </div>
          )}
          <hr />
          {isAdmin && (
            <>
              <h2 className="pe-3">
                תפקיד:<span className="text-danger">{user.role}</span>
              </h2>
            </>
          )}

          <p className="pe-3">שם: {user.name}</p>
          <p className="pe-3">שם משתמש: {user.username}</p>
          <p className="pe-3">אימייל: {user.email}</p>
          <p className="pe-3">טלפון: {user.phone}</p>
          <p className="pe-3">עיר: {user.city}</p>
          <p className="pe-3">כתובת: {user.address}</p>
          <p className="pe-3">תאריך לידה: {flipDateOrder(user.dob)}</p>
          <p className="pe-3">
            תאריך הצטרפות: {flipDateOrder(user.date_created.slice(0, 10))}
          </p>
          {productsInCart > 0 &&
          <div className="d-flex align-items-center justify-content-center">
            <Button
              variant="contained"
              color="info"
              size="large"
              onClick={() => {
                nav("/cart");
              }}
            >
              <ShoppingCart />
              עגלה שלך
              <ShoppingCart />
            </Button>
          </div>
        }
        </div>
    </>
  );
}
