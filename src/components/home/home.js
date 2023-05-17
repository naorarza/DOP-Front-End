import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UploadWidget from "../profile_comps/uploadWidget";
import './home.css';

export default function Home() {
  
  const { user, isAdmin, isOwner , mutate } = useContext(AuthContext);

  const nav = useNavigate();

  
  return (
    <>
      <div id='mainDiv' style={{ minHeight: "95vh" }}>
        {/* <UploadWidget/> */}
        {user ? (
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
        {isOwner && <h2>Your Owner</h2>}
      </div>
    </>
  );
}
