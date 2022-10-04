import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  // Поскольку нам здесь нужно следить за изменениями состояния { user },
  // оборачиваем App в функцию observer()
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true); // идёт загрузка страницы или нет?

  // Проверяем check() один раз при первом открытии приложения. Если массив зависимостей пустой,
  // то функция отработает лишь единожды, при первом запуске приложения.
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
