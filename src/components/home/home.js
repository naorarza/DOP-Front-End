import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UploadWidget from "../profile_comps/uploadWidget";
import "./home.css";
import { CenterMode } from "../../slider_Comps/centerMode";

export default function Home() {
  const nav = useNavigate();

  return (
    <>
      <div id="mainDiv" style={{ minHeight: "95vh" }}>
        {/* <UploadWidget/> */}
        {/* {user ? (
          <div>
            <h2>Welcome {user.name} you are logged in</h2>
            <h2>Home page</h2>
            <div onClick={mutate} className="btn btn-primary">
              reload
            </div>
          </div>
        ) : (
          <h2>Home page</h2>
        )}
        {isAdmin && !isOwner && <h2>Your Admin</h2>}
        {!isAdmin && <>Your Guest</>}
        {isOwner && <h2>Your Owner</h2>} */}
        <div id="image1"></div>
        <CenterMode />
        <div
        style={{textShadow:'3px 2px 3px rgba(255,255,255,.2)',fontSize:'1.3em'}} 
          id="image2"
          className="d-flex py-3 px-4 align-items-end justify-content-between "
        >
          <div id="openTime" className="">
            <div>
              <h3 className="px-2">זמני פתיחה</h3>
              <p>
                ראשון: 18:00 - 01:00
                <br />
                שני: 18:00 - 01:00
                <br />
                שלישי: 18:00 - 01:00
                <br />
                רביעי: 18:00 - 01:00
                <br />
                חמישי: 18:00 - 01:00
                <br />
                שישי: 18:00 - 01:00
                <br />
                שבת: 18:00 - 01:00
              </p>
            </div>
          </div>

          <div>
            <h3>מיקום</h3>
            כתובת: אלנבי 143 תל-אביב
            <br />
            <a
              href=" https://waze.com/ul?ll=32.06954079,34.77068071&navigate=yes"
              target="_blank"
            >
              דרכי הגעה
            </a>
          </div>

          <div>
            <h3>יצירת קשר</h3>
            פלאפון: <p className="phoneText">0537201229 / 0536297403</p>
    
            <a style={{textShadow:'3px 2px 3px rgba(255,255,255,.2)'}} className="phone" href="tel:0537201229">
              0537201229
            </a>{" "}
            <span className="phone"> / </span>
            <a className="phone" href="tel:0536297403">
              0536297403
            </a>
            <a href="mailto:m0504152128@gmail.com" target="_blank">
              מייל ליצירת קשר
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
