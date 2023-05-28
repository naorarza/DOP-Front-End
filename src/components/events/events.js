import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./events.css";

export default function Events() {
  const { theme, text } = useContext(AuthContext);

  return (
    <div className="events" style={{ minHeight: "95vh", color:"#fff" }}>
        <h1 className="text-center p-4">בחירת אירוע לביצוע בבר</h1>
        <hr style={{color:"#fff"}} />
     
    </div>
  );
}
