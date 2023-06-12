import { HomeOutlined, LogoutOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Home() {

  return (
    <div>
      <Tooltip title="דף בית">
        <Link
          to={"/"}
          style={{
            color: "white",
            marginLeft: "25px",
            cursor: "pointer",
          }}
        >
          <HomeOutlined style={{ fontSize: "2.2em" }} />
        </Link>
      </Tooltip>
    </div>
  );
}
