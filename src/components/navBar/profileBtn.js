import {
  AccountBoxOutlined,
  ListAlt,
  LogoutOutlined,
  SettingsSharp,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Dropdown } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import AuthContext from "../../context/AuthContext";

export default function ProfileBtn() {

  const { handleLogout } = useContext(AuthContext);


  const items = [
    {
      key: "1",
      label: (
        <Link className="text-decoration-none" to="/profile/settings">
          <SettingsSharp /> <span> הגדרות </span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link className="text-decoration-none" to="/profile/orders">
          <ListAlt /> <span> היסטוריה </span>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link className="text-decoration-none" onClick={handleLogout} to={"/"}>
          <LogoutOutlined /> <span>התנתקות</span>
        </Link>
      ),
    },
  ];
  return (
    <div>
      <Dropdown
        placement="bottom"
        menu={{
          items,
        }}
        className="dropDown"
      >
        <Tooltip
          style={{
            width: "15px",
            display: "flex",
            marginLeft: "50px",
          }}
          placement="left"
          title=""
        >
          <Link className="text-decoration-none" to="/profile">
            <AccountBoxOutlined
              className="ms-5"
              fontSize="large"
              // color="action"
              style={{ color: "#fff" }}
            />
          </Link>
        </Tooltip>
      </Dropdown>
    </div>
  );
}
