import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { Context } from "..";
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
  // Без observer() не будет отслеживания за изменениями в store.
  // onClick={() => user.setIsAuth(true)} работать не будет

  const { user } = useContext(Context);
  // console.log(user.isAuth);

  const history = useHistory();
  /* 
   useHistory поменялсь на useNavigate в react-router-dom v6
Из за этого всё надо менять так:
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
В новой версий не надо вызывать push a можнo сразу передать ссылку
  */

  // выход из авторизации
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          Магазин "Купи девайс"
        </NavLink>

        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className={"ml-2"}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
