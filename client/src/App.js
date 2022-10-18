import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar";
import { Spinner } from "react-bootstrap";
import { Context } from ".";
import { check } from "./http/userApi";
import { getDeviceFromBasket } from "./http/deviceApi";
import { get } from "mobx";

const App = observer(() => {
  // Поскольку нам здесь нужно следить за изменениями состояний { user, basket },
  // оборачиваем App в функцию observer()
  const { user, basket } = useContext(Context);
  const [loading, setLoading] = useState(true); // идёт загрузка страницы или нет?

  // check(). Проверяем авторизацию один раз при первом открытии приложения. Если массив зависимостей
  // пустой, то функция отработает лишь единожды, при первом запуске приложения.
  useEffect(() => {
    // Если check() выполнилась успешно, то....
    check()
      .then((data) => {
        // значит пользователь залогинился
        user.setUser(true);
        user.setIsAuth(true);
        // не важно, произошла ошибка или нет(finally), делаем setLoading(false)
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Загрузка корзины
  useEffect(() => {
    // если пользователь не авторизованн
    if (user.isAuth === false) {
      // очистить корзину и итоговую стоимость в BasketStore
      basket.setDeleteAllDeviceFromBasket();
      // получаем из локального хранилища (в браузере) значение по ключу ("basket")
      // в виде JSON-строки, сразу парсим его и присваиваем полученное переменной savedBasket
      const savedBasket = JSON.parse(localStorage.getItem("basket"));
      // перебираем полученное из браузера содержимое корзины по ключу
      for (let key in savedBasket) {
        // и записываем его в корзину в BasketStore так же по ключу
        basket.setBasket(savedBasket[key]);
      }
    } else if (user.isAuth === true) {
      // очистить корзину и итоговую стоимость в BasketStore
      basket.setDeleteAllDeviceFromBasket();
      // получаем из базы данных содержимое корзины
      getDeviceFromBasket().then((data) => {
        // перебираем полученное из базы данных содержимое корзины по ключу
        for (let key in data) {
          // и записываем его в корзину в BasketStore так же по ключу
          basket.setBasket(data[key], true);
        }
      });
    }
  }, [basket, user.isAuth]);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
