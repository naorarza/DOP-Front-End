import React from "react";
import { Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Item(props) {
    const nav = useNavigate();
  return (
    <Paper className="d-flex flex-column align-items-center p-2 justify-content-center">
      <h2>{props.item.product_name}</h2>
      <p>{props.item.description}</p>
      <img style={{height:'200px' , borderRadius:'4px'}} className="col-lg-6" src={props.item.img_url} alt={props.item.product_name} />
    <br />
      <Button onClick={() => {
                    nav("/product/" + props.item._id);
                  }}  size="medium"
                  variant="contained"
                  color="success">צפייה במוצר!</Button>
    </Paper>
  );
}
