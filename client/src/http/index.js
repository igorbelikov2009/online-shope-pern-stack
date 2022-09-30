import axios from "axios";

// обычный хост
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// делаем авторизацию хоста
const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

// авторизованный хост
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
