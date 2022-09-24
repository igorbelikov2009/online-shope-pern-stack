const {
  Orders,
  OrderDevice,
  Device,
  Brand,
  Type,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

class OrdersController {
  // создаём заказ
  async create(req, res) {
    // получаем токен, если он есть, если нет, то пустую строку
    // из заголовка запроса из строки authorization
    const auth = req.headers.authorization || "";
    // из тела запроса получаем мобильный и корзину
    const { mobile, basket } = req.body;

    try {
      // создаём пустой массив устройств, находящихся в корзине
      let parseDevices = [];
      // наполняем его
      for (let key of basket) {
        parseDevices.push(key.id);

        // ищем устройства в базе данных по условиям {id}
        const isDeviceInDB = await Device.findAndCountAll({
          where: { id: parseDevices },
          attributes: ["id"],
        });

        // если все устройства были найдены в БД
        if (isDeviceInDB.count === parseDevices.length) {
          const row = { mobile };
          // если у авторизации есть токен, то есть строка не пуста
          if (auth) {
            const token = auth.split(" ")[1];
            // если токен есть, то нам надо его раскодировать и получить  { id } с помощью функции verify()
            const { id } = jwt.verify(token, process.env.SECRET_KEY); // 1-ый парам - сам токен, 2-й - секретный ключ из переменного окружения .env
            // После того, как токен мы декодировали, необходимо выцепить оттуда  { id } и присвоить его значение row.userId
            // таким обазом мы получаем userId, как { id } из токена авторизации
            row.userId = id;
          }

          // непосредственно создаём все заказы
          await Orders.create(row).then((order) => {
            // получаем id из order
            const { id } = order.get();
            // пробегаемся по parseDevices, в каждой итерации вызываем асинхорнную фунцию с параметрами (deviceId, i)
            parseDevices.forEach(async (deviceId, i) => {
              // непосредственно создаём отдельный заказ
              await OrderDevice.create({
                orderId: id,
                deviceId,
                count: basket[i],
              });
            });
          });
        } else {
          // //  отправить сообщение об устройствах, которые не найдены в БД
          // создаём массив не найденых идентификаторов устройств
          const notFoundIdDevices = [];

          // создаём массив найденых идентификаторов устройств
          const arrDevices = [];

          // пробегаемся по устройствам, находящихся в базе данных по условиям {id} устройств, находящихся в корзине
          // и наполняем массив найденых идентификаторов устройств
          isDeviceInDB.rows.forEach((item) => arrDevices.push(item.id));

          // пробегаемся по массиву устройств, находящихся в корзине
          parseDevices.forEach((deviceId) => {
            // проверяем, если массив найденых идентификаторов устройств не включает в себя deviceId (id заказа)
            if (!arrDevices.includes(deviceId)) {
              // то это устройство отправляем в массив не найденых идентификаторов устройств
              notFoundIdDevices.push(deviceId);
            }
          });
          return ApiError.badRequest(
            res.json(
              `Это устройство id(${notFoundIdDevices.join(
                ", "
              )}) не существует в БД`
            )
          );
        }
        return res.json("Спасибо за ваш заказ! Мы скоро с Вами свяжемся");
      }
    } catch (e) {
      return res.json(e);
    }
  }

  // обновление-редактирование заказа
  async updateOrder(req, res) {
    try {
      // получаем из тела запроса и присваиваем методом деструктуризации
      const { complete, id } = req.body;

      // ищем в базе данных заказ по условию {id}
      await Orders.findOne({ where: { id } }).then(async (data) => {
        // если находим
        if (data) {
          // то обновляем
          await Orders.update({ complete }, { where: { id } }).then(() => {
            return res.json("Заказ обновлен");
          });
        } else {
          return res.json("Данного заказа нет в БД");
        }
      });
    } catch (e) {
      return res.json("Обновление не завершено из-за ошибки: " + e);
    }
  }

  // удаление заказа
  async deleteOrder(req, res) {
    try {
      // получаем id из тела запроса
      const { id } = req.body;

      // ищем в базе данных по условию { id }  заказ, который нужно удалить
      await Orders.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          // если находим, то удаляем его по условию { id }
          await Orders.destroy({ where: { id } }).then(() => {
            // и возвращаем на клиент сообщение
            return res.json("Заказ удалён");
          });
        } else {
          // если закза с указанным ID нет в базе данных, то возвращаем клиенту сообщение
          return res.json("Этого заказа нет в базе данных");
        }
      });
    } catch (e) {
      return res.json("Удаление не завершено из-за ошибки: " + e);
    }
  }

  // получить все заказы
  async getAll(req, res) {
    // Здесь будем принимать { complete }, и если оно не указаны, будем возвращать все девайсы.
    // Если complete указано, то будем делать некую фильтрацию, в зависимости от его значения
    let { limit, page, complete } = req.query; // complete будем получать из query, то есть из строки запроса
    page = page || 1;
    limit = limit || 7; // Если лимит не указан, то на страницу будем отправлять по 7 заказов

    // Посчитаем отступ. Допустим мы на второй (page = 2) странице и первые 7 заказов нам надо пропустить (2 * 7 - 7 = 7 ). Отступ получается в 7 заказов
    let offset = page * limit - limit;
    let devices;
    // делаем фильтрацию, в зависимости от значения complete
    if (complete === "not-completed") {
      devices = await Orders.findAndCountAll({
        where: { complete: false },
        limit,
        offset,
      });
    } else if (complete === "completed") {
      devices = await Orders.findAndCountAll({
        where: { complete: true },
        limit,
        offset,
      });
    } else {
      devices = await Orders.findAndCountAll({ limit, offset });
    }

    return res.json(devices);
  }

  // получить один заказ
  async getOne(req, res) {
    // В первую очередь получаем id устройства из параметров.
    // Этот параметр мы указывали в ordersRouter: router.get("/:id", checkRole("ADMIN"), ordersController.getOne);
    const { id } = req.params;
    // создаём order - пустой объект
    const order = {};
    try {
      let devices;
      let infoDevices = [];

      // находим один заказ по условию  { where: { id } }
      await Orders.findOne({ where: { id } })
        .then(async (data) => {
          order.descr = data;
          devices = await OrderDevice.findAll({
            attributes: ["deviceId", "count"],
            where: { orderId: data.id },
          });

          for (let device of devices) {
            await Device.findOne({
              attributes: ["name", "img", "price"],
              where: { id: device.deviceId },
              include: [
                {
                  attributes: ["name"],
                  model: Type,
                },
                {
                  attributes: ["name"],
                  model: Brand,
                },
              ],
            }).then(async (item) => {
              let newObj = {
                descr: item,
                count: device.count,
              };
              infoDevices.push(newObj);
            });
          }
          order.devices = infoDevices;

          return res.json(order);
        })
        .catch(() => {
          return res.json("Order doesn't exist in data base");
        });
    } catch (e) {
      return res.json("Delete didn't complete because was error: " + e);
    }
  }
}

module.export = new OrdersController();
