import { LogoutOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function SignOut() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div>
      <Tooltip title="התנתקות">
        <Link
          to={"/"}
          onClick={handleLogout}
          style={{
            color: "white",
            marginLeft: "25px",
            cursor: "pointer",
          }}
        >
          <LogoutOutlined style={{ fontSize: "2em" }} />
        </Link>
      </Tooltip>
    </div>
  );
}
