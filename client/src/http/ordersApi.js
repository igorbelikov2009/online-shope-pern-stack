import { $authHost, $host } from ".";

// Отправить заказ
export const sendOrder = async ({ auth, mobile, basket }) => {
  if (auth) {
    const { data } = await $authHost({
      method: "POST",
      url: "api/orders",
      data: { mobile, basket },
    });
    return data;
  } else {
    const { data } = await $host({
      method: "POST",
      url: "api/orders",
      data: { mobile, basket },
    });
    return data;
  }
};

// Получить заказы
export const fetchOrders = async ({ limit, page, complete }) => {
  const { data } = await $authHost.get(
    `api/orders?limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};

// Получить изменение статуса заказа
export const fetchChangeStatusOrder = async ({ complete, id }) => {
  const { data } = await $authHost.put("api/orders", { complete, id });
  return data;
};

// Удалить заказ
export const fetchDeleteOrder = async ({ id }) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/orders",
    data: { id },
  });
  return data;
};

// Получить один заказ-устройство
export const getOneOrderDevices = async (id) => {
  const { data } = await $authHost.get("api/orders/" + id);
  return data;
};
