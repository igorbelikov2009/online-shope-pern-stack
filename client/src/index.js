import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import BasketStore from "./store/BasketStory";
import DeviceStore from "./store/DeviceStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);
// Создали контекст и через его props-value в Context.Provider передаём объект {},
// где в поле user создадим новый объект класса UserStore(), который мы сделали в "./store/UserStore";
// в поле device создадим новый объект класса DeviceStore(), который мы сделали в "./store/DeviceStore";
// а в поле basket создадим новый объект класса BasketStore(), который мы сделали в "./store/BasketStory";

// console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
      basket: new BasketStore(),
    }}
  >
    <App />
  </Context.Provider>
);
