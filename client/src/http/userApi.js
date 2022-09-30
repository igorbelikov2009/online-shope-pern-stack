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

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
