import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductRow = ({ item }) => {
  const shekel = `${Number(item.product_price / 3.71).toFixed(2)}$`;
  const dolar = `${Number(item.product_price).toFixed(2)}₪`;
  const [price, setPrice] = useState(dolar);
  const changePrice = () => {
    if (price === dolar) {
      setPrice(shekel);
    }
    if (price === shekel) {
      setPrice(dolar);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ boxShadow: "1px 1px 3px 1px #000000" }}
      className="p-1 d-flex justify-content-between align-items-center"
    >
      <div>
        <Link to={`/product/${item._id}`}>
          <img src={item.img_url} alt="Sample Image" height="100" width="100" />
        </Link>
      </div>
      <div>
        <h4>{item.product_name}</h4>
        <p>{item.info}</p>
      </div>
      <div>
        {price}
        <Tooltip placement="bottom" title={`שנה ערך`}>
          <ChangeCircleIcon
            style={{ cursor: "pointer", marginRight: 5 }}
            onClick={() => {
              changePrice();
            }}
          />
        </Tooltip>
      </div>
    </motion.div>
  );
};

export default ProductRow;
