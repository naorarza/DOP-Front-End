import "./beer.css";
import React from "react";

export default function Loading() {
  //     margin: 0;
  //   padding: 0;
  //   height: 100vh;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   background: #00112c;
  return (
    <div style={{background:'#00112c' ,flexDirection:'column', height:'100vh' , display:'flex', justifyContent:'center' , alignItems:'center'}}>
      <div id="mug">
        <div id="beer"></div>
        <div className="bubbles top-glass-bubble-1"></div>
        <div className="bubbles top-glass-bubble-2"></div>
        <div className="bubbles top-glass-bubble-3"></div>
        <div className="bubbles top-glass-bubble-4"></div>
        <div className="bubbles top-air-bubble-1"></div>
        <div className="bubbles top-air-bubble-2"></div>
        <div className="bubbles top-air-bubble-3"></div>
        <div className="bubbles vertical-glass-bubble-1"></div>
        <div className="bubbles vertical-glass-bubble-2"></div>
        <div className="inner-bubbles inner-bubble-1"></div>
        <div className="inner-bubbles inner-bubble-2"></div>
        <div className="inner-bubbles inner-bubble-3"></div>
        <div className="inner-bubbles inner-bubble-4"></div>
        <div className="inner-bubbles inner-bubble-5"></div>
      </div>
      <h2 className="text-light">הדף בטעינה..</h2>
    </div>
  );
}
