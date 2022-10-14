### устанавливаем:

1. npx create-react-app online-shop-react
2. npm i axios
3. npm i react-router-dom@5.3.3 https://www.npmjs.com/package/react-router-dom/v/5.3.3
4. npm i mobx https://www.npmjs.com/package/mobx
5. npm i mobx-react-lite (state manager react) https://www.npmjs.com/package/mobx-react-lite

6. npm install react-bootstrap bootstrap@4.6.0 https://react-bootstrap-v4.netlify.app/getting-started/introduction 4.6 - версия
7. (npm install react-bootstrap (bootstrap 5) https://react-bootstrap.github.io/getting-started/introduction/) 5 - версия
8. копируем ссылку на странице react-bootstrap и вставляем в index.html в самый низ перед <title>Online-shop React</title>
<link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
     integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
     crossorigin="anonymous"
   />

9. npm i jwt-decode https://www.npmjs.com/package/jwt-decode

10. Установка PostgreSQL для Windows(база данных в компьютере) https://postgrespro.ru/windows
11. pgadmin для PostgreSQL https://www.pgadmin.org/
12. pgadmin для PostgreSQL https://www.postgresql.org/ftp/pgadmin/pgadmin4/v6.13/windows/
13. Установка Material UI v-5 (npm install @mui/material @emotion/react @emotion/styled)
    без emotion работать не будет

### `npm start`

### Создаём структуру

1. npm i jwt-decode https://www.npmjs.com/package/jwt-decode
   jwt-decode — это небольшая библиотека браузера, которая помогает декодировать токен JWT, закодированный Base64Url.
   ВАЖНО: эта библиотека не проверяет токен, любой правильно сформированный JWT может быть декодирован. Вы должны проверить токен в логике на стороне сервера, используя что-то вроде express-jwt , koa-jwt , Owin Bearer JWT и т. д.

Предупреждение. При обновлении с версии 2 до версии 3 возможны критические изменения.

Если вы ранее импортировали библиотеку как import \* as jwt_decode from 'jwt-decode', вам придется изменить импорт на import jwt_decode from 'jwt-decode';
