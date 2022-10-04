import { $host, $authHost } from ".";
import jwt_decode from "jwt-decode"; // c помощью jwt_decode мы сможем токен распарсить (декодировать)

// export const registration = async (email, password) => {
//   const response = await $host.post("api/user/registration", {
//     email,
//     password,
//     role: "ADMIN",
//   });

//   return response;
// };

export const registration = async (email, password) => {
  // делаем деструктуризацию: вместо response => { data }
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "ADMIN",
  });

  /* Это тело запроса
    { 
    email,
    password,
    role: "ADMIN",
  });
  */

  // После того, как запрос прошёл, и мы получили данные,
  // будем, в локальное хранилище по ключу "token", помещать токен из тела запроса
  localStorage.setItem("token", data.token);
  // и возвращаем декодируемый токен
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  //  после того, как запрос прошёл, мы получили данные, будем в локальное хранилище
  // по ключу token помещать помещать token  из тела запроса
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

// Функция проверки проверяет валидность полученного токена.
// Пользователь авторизовался, токен сохранился, и каждый раз при обновлении страницы будет
// вызываться функция check.
// Если токен не валидный, то пользователь будет разлогиниваться.
// Если валидный, то пользователь будет попадать на страницу магазина под своим аккаунтом.
// Поскольку check нам опять возвращает токен, будем перезаписывать его и возвращать в локальное хранилище по ключу "token"

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
