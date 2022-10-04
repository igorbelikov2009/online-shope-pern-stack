import { $host, $authHost } from ".";

// Создание типов
export const createType = async (type) => {
  // Чтобы создать тип, нужна авторизация, нужно быть админом $authHost
  const { data } = await $authHost.post("api/type", type); // телом запроса будем передавать type
  return data;
};

// Получение типов
// Любой пользователь может получать список типов (можно через обычный хост)
export const fetchTypes = async () => {
  // Вызываем fetchTypes() в Shop.js в useEffect()
  const { data } = await $host.get("api/type");
  return data;
};

// Создание брэндов
export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

// Получение брэндов
export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

// Создание устройств
export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

// Получение устройств
export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

// export const fetchOneDevice = async (id) => {
//   const { data } = await $host.get("api/device/" + id);
//   return data;
// };

// Получение одного устройства
export const fetchOneDevice = async (id) => {
  const { data } = await $host.get(`api/device/${id}`);
  return data;
};
