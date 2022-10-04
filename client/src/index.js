import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DeviceStore from "./store/DeviceStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);
// Создали контекст и через его props-value в Context.Provider передаём объект {},
// где в поле user создадим новый объект класса UserStore(), который мы сделали в "./store/UserStore";
// а в поле device создадим новый объект класса DeviceStore(), который мы сделали в "./store/DeviceStore";

// console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{ user: new UserStore(), device: new DeviceStore() }}
  >
    <App />
  </Context.Provider>
);
