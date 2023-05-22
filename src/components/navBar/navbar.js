import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { SidebarData } from "./sidebarData";
import "./navbar.css";
import { BiLogIn } from "react-icons/bi";
import {
  AdminPanelSettings,
  LoginOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useEffect } from "react";
import { AdminSide } from "./adminSideBar/adminSide.js";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Tooltip } from "@mui/material";
import ProfileBtn from "./profileBtn";
import SignOut from "./signOut";
import CartShow from "./cartShow";

export default function Navbar({ sidebar, setSidebar }) {
  const { user, isAdmin, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    lockScroll();
  }, [sidebar]);

  const lockScroll = () => {
    if (!isAdmin) {
      if (sidebar) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }
  };

  const Signout = () => (
    <li className="nav-text">
      <Link onClick={handleLogout} to={"/"}>
        <LogoutOutlined />
        <span className="me-3">התנתקות</span>
      </Link>
    </li>
  );

  const Login = () => (
    <li className="nav-text">
      <Link to={"/login"}>
        <BiLogIn />
        <span className="me-3">התחברות/הרשמה</span>
      </Link>
    </li>
  );

  useEffect(() => {}, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar d-flex justify-content-between align-items-center">
          <Link to="#" className="menu-bars">
            <FaBars onClick={() => setSidebar(!sidebar)} />
          </Link>
          {user?.name ? (
            <div onClick={() => setSidebar(false)} className="d-flex">
              <SignOut />
              <ProfileBtn />
              <CartShow />
            </div>
          ) : (
            <div>
              <Tooltip title="התחברות">
                <Link
                  style={{ color: "white", marginLeft: "15px" }}
                  to="/login"
                >
                  <LoginOutlined style={{ fontSize: "2em" }} />
                </Link>
              </Tooltip>
            </div>
          )}
        </div>
        <div
          onClick={() => setSidebar(false)}
          style={
            sidebar
              ? {
                  height: "100vh",
                  width: "100%",
                  position: "absolute",
                  zIndex: "8",
                }
              : {
                  height: "100vh",
                  width: "100%",
                  position: "absolute",
                  zIndex: "-3",
                }
          }
        >
          <nav
            style={{
              position: "fixed",
              overflowY: "scroll",
              top: "0px",
              bottom: "0px",
            }}
            className={sidebar ? "nav-menu active" : "nav-menu"}
          >
            <ul className="nav-menu-items" onClick={() => setSidebar(!sidebar)}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiOutlineClose />
                </Link>
              </li>
              {user?.name ? (
                <>
                  <h3 className=" text-center">
                    <Link
                      className="text-decoration-none text-light"
                      to={"/profile"}
                    >
                      {user.name}
                      {isAdmin ? <AdminPanelSettings /> : <></>}
                    </Link>
                  </h3>
                  <div className="d-flex justify-content-center align-items-center text-center">
                    <Link className="text-decoration-none " to={"/profile"}>
                      <img
                        src={user.profile_img}
                        alt="profile_img"
                        id="my-nav-avatar"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <></>
              )}
              <hr className="text-light" />
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icons}
                      <span className="me-3">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              {user ? <Signout /> : <Login />}
              {isAdmin && user ? (
                <>
                  <hr className="text-light" />
                  {AdminSide.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icons}
                          <span className="me-3">{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}
