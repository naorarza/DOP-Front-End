import React, { useContext } from "react";
import ProductRow from "./productRow";
import AuthContext from "../../../../context/AuthContext";
// import ProductRow from './ProductRow';

export default function ProductlList(props) {
  const ar = props.ar;
  const {theme, text} = useContext(AuthContext)
  console.log(ar);

  return (
    <div className="container main-content">
      <h2 className="mt-3 text-center">רשימת המוצרים שהוזמנו</h2>
      <hr />
      <br />

      {ar.map((item, i) => {
        return <ProductRow item={item} key={i} number={i + 1} />;
      })}
    </div>
  );
}
