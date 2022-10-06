import { $host, $authHost } from ".";

//========================== Создание типов
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
// Удаление типов
// Чтобы удалить тип, нужна авторизация, нужно быть админом $authHost
export const deleteType = async (id) => {
  const { data } = await $authHost({ method: "DELETE", url: "api/type/" + id });
  return data;
};

//========================== Создание брэндов
export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};
// Получение брэндов
export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};
// Удаление брэнда, нужна авторизация, нужно быть админом $authHost
export const deleteBrand = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/brand/" + id,
  });
  return data;
};

//========================== Создание устройств
export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

// Получение устройств
export const fetchDevices = async (typeId, brandId, page, limit = 9) => {
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

// Получение одного устройства
export const fetchOneDevice = async (id) => {
  const { data } = await $host.get(`api/device/${id}`);
  // одинаково с выражением ниже
  // const { data } = await $host.get("api/device/" + id);
  return data;
};

// Удаление одного устройства
export const fetchDeleteDevice = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: `api/device/${id}`,
  });
  return data;
};

// Обновление-редактирование устройства
export const updateDevices = async (id, body) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/device/${id}`,
    data: body,
  });
  return data;
};

//==========================
// Получить все устройства на странице администратора
export const getAllDevicesInAdminPage = async (
  name,
  page = 1,
  filter = "All"
) => {
  const { data } = await $authHost({
    method: "GET",
    url: `api/device/search?page=${page}&name=${name}&filter=${filter}`,
  });
  return data;
};

//==========================
/// Добавить устройство в корзину
export const addDeviceToBasket = async (device) => {
  const { data } = await $authHost.post("api/basket", device);
  return data;
};

// Получить устройство из корзины
export const getDeviceFromBasket = async () => {
  const { data } = await $authHost.get("api/basket");
  return data;
};

// Удалить устройство из корзины
export const deleteDeviceFromBasket = async (id) => {
  const { data } = await $authHost.delete(`api/basket/${id}`);
  return data;
};

//==========================
// Добавить рейтинг
export const addRating = async (body) => {
  const { data } = await $authHost.post("api/rating", body);
  return data;
};

// Проверить рейтинг
export const checkRating = async (body) => {
  const { data } = await $authHost.post("api/rating/check-rating", body);
  return data;
};
