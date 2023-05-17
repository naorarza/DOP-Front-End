import { AccountBoxOutlined, SettingsSharp } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Dropdown } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

export default function ProfileBtn() {
  const items = [
    {
      key: "1",
      label: (
        <Link className="text-decoration-none" to='/profile/settings'>
           <SettingsSharp/> <span> הגדרות </span>
        </Link>
      ),
    },
  ];
  return (
    <div>
      <Dropdown
      placement="bottom"
        menu={{
          items
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
              color="action"
            />
          </Link>
        </Tooltip>
      </Dropdown>
    </div>
  );
}
