import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  // console.log(user.isAuth);

  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
});

// в <Switch>, если не отрабатывает ни одна из страниц,
// то отрабатывает последняя: <Redirect to={SHOP_ROUTE} />
export default AppRouter;

/* В новых версиях React Router немного изменилась документация. 
Switch (в файле по пути components/AppRoutes из урока) заменить на => 'Routes'. 
Так же 'Components' (в строке Route) заменить на => 'element'. 
Эта строка должна выглядеть так: "<Route key={path} path={path} element={<Component/>} exact/>"
Так же для "Redirect". Его в новой версии не импортируем. Вместо него использовать просто: "<Route path="*" element=(<Shop/>)/>".
*/
