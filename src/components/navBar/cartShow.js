import { ShoppingCartCheckout } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function CartShow() {
  const { productsInCart } = useContext(AuthContext);

  return (
    <div style={{ position: "relative" }}>
            {productsInCart > 0 && (
      <Tooltip placement="bottom" title="עגלה">
        <div
          style={{
            width: "15px",
            display: "flex",
            marginLeft: "70px",
          }}
        >
          <Link to="/cart" style={{ width: "15px" }}>
              <>
                <div className="justify-content-center circle text-dark text-center d-flex align-items-center pe-1">
                  {productsInCart}
                </div>
                <ShoppingCartCheckout
                  className="ms-5"
                  fontSize="large"
                  // color="action"
                  style={{color:'#fff'}}
                />
              </>
          </Link>
        </div>
      </Tooltip>
            )}
    </div>
  );
}
