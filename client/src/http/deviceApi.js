import { $host, $authHost } from ".";
// import jwt_decode from "jwt-decode"; // c помощью jwt_decode мы сможем токен распарсить (декодировать)

export const createType = async (type) => {
  // чтобы создать тип, нужна авторизация, нужно быть админом $authHost
  const { data } = await $authHost.post("api/type", type); // телом запроса будем передавать type
  return data;
};

// любой пользователь может список типов получать (можно через обычный хост)
export const fetchTypes = async () => {
  // вызываем fetchTypes() в Shop.js в useEffect()
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async () => {
  const { data } = await $host.get("api/device");
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

// export const fetchOneDevice = async () => {
//   const { data } = await $host.get("api/device/5");
//   return data;
// };

// export const fetchOneDevice = async (id) => {
//   const { data } = await $host.get(`api/device/${id}`);
//   return data;
// };
