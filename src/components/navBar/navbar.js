import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
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
import { motion } from "framer-motion";
import Home from "./home";

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
    <motion.li
      initial={{ x: 150 }}
      whileInView={{ x: 0 }}
      transition={{
        duration: `${times[SidebarData.length - 1]}`,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="nav-text"
    >
      <Link className="NavLink" onClick={handleLogout} to={"/"}>
        <LogoutOutlined />
        <span className="me-3">התנתקות</span>
      </Link>
    </motion.li>
  );

  const Login = () => (
    <motion.li
    initial={{ x: 150 }}
    whileInView={{ x: 0 }}
    transition={{
      duration: `${times[SidebarData.length - 1]}`,
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }} className="nav-text">
      <Link className="NavLink" to={"/login"}>
        <LoginOutlined />
        <span className="me-3">התחברות/הרשמה</span>
      </Link>
    </motion.li>
  );

  const times = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2];
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar d-flex justify-content-between align-items-center">
          <Link to="#" className="menu-bars">
            <FaBars onClick={() => setSidebar(!sidebar)} />
          </Link>
          {user?.name ? (
            <div onClick={() => setSidebar(false)} className="d-flex">
              {/* <SignOut /> */}
              <Home/>
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
                  <motion.h3
                    initial={{ scale: 1.3 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className=" text-center"
                  >
                    <Link
                      className="text-decoration-none text-light"
                      to={"/profile"}
                    >
                      {user.name}
                      {isAdmin ? <AdminPanelSettings /> : <></>}
                    </Link>
                  </motion.h3>
                  <div className="d-flex justify-content-center align-items-center text-center">
                    <Link className="text-decoration-none " to={"/profile"}>
                      <motion.img
                        initial={{ scale: 1.3 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: 'spring' , damping:8 }}
                        className=" text-center"
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
                console.log(times[index]);
                return (
                  <motion.li
                    initial={{ x: 150 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: `${times[index]}` }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={index}
                    className={item.cName}
                  >
                    <NavLink className="NavLink" to={item.path}>
                      {item.icons}
                      <span className="me-3">{item.title}</span>
                    </NavLink>
                  </motion.li>
                );
              })}
              {!user ? <Login /> : <Signout/>}
              {isAdmin && user ? (
                <>
                  <hr className="text-light" />
                  {AdminSide.map((item, index) => {
                    console.log(SidebarData.length);
                    return (
                      <motion.li
                        initial={{ x: 150 }}
                        whileInView={{ x: 0 }}
                        transition={{
                          duration: `${times[index + SidebarData.length]}`,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={index}
                        className={item.cName}
                      >
                        <NavLink className="NavLink" to={item.path}>
                          {item.icons}
                          <span className="me-3">{item.title}</span>
                        </NavLink>
                      </motion.li>
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
