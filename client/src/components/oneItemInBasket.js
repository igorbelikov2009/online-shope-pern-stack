import React, { useContext } from "react";
import { Context } from "../index";

const OneItemInBasket = ({ device }) => {
  const { basket, user } = useContext(Context);
  console.log(device, basket, user);

  return <div></div>;
};

export default OneItemInBasket;
