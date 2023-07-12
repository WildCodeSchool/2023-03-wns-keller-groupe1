import React, { useState } from "react";
import "./Cards.css";
import logo from "../../assets/images/LeafWitheRbg.png";

function Cards({ name, age, about, email, tel, city, gender }: any) {
  return (
    <div className="card">
      <div className="upper-container">
        <div className="img-container">
          <img src={logo} alt="" height="100px" width="100px" />
        </div>
      </div>
      <div className="lower-container">
        <h3>{name}</h3>
        <h4>{age}</h4>
        <h4>{gender}</h4>
        <h4>{tel}</h4>
        <h4>{email}</h4>
        <h4>{city}</h4>
        <p>{about}</p>
      </div>
    </div>
  );
}

export default Cards;
