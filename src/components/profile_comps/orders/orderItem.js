import { Button, Tooltip } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useNavigate } from "react-router-dom";

export default function OrderItem({ item, number }) {
  const nav = useNavigate();
  const shekel = `${Number(item.order_price * 3.24).toFixed(2)}₪`;
  const dolar = `${Number(item.order_price).toFixed(2)}$`;
  const [price, setPrice] = useState(dolar);
  const fixedDate = (_date) => {
    const date = new Date(_date);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  const changePrice = () => {
    if (price === dolar) {
      setPrice(shekel);
    }
    if (price === shekel) {
      setPrice(dolar);
    }
  };

  return (
    <tr className="text-center">
      <th scope="row">({number})</th>
      <td>{fixedDate(item.order_date)}</td>
      <td>
        {price}
      <Tooltip placement="bottom" title={`שנה ערך`}>
        <ChangeCircleIcon
          style={{ cursor: "pointer", marginRight: 5 }}
          onClick={() => {
            changePrice();
          }}
        />
        </Tooltip>
      </td>
      <td>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => {
            nav(`/profile/orders/${item._id}`);
          }}
        >
          מעבר לפרטי הזמנה
        </Button>
      </td>
    </tr>
  );
}
