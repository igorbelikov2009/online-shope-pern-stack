const { Op } = require("sequelize");
const uuid = require("uuid"); // импортируем из установок пакет uuid
const {
  Device,
  DeviceInfo,
  Type,
  Brand,
  OrderDevice,
  BasketDevice,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path"); // импортируем пакет из модуля node.js

class DeviceController {
  // создаём устройства
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body; // info - массив информации
      const { img } = req.files; // получаем файл
      // после получения файла нам необходимо сгенерировать для него уникальное имя,
      // по которому потом мы будем получать этот файл
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName)); // перемещаем файл
      // с генерируемым именем fileName в папку static

      // (п.1) непосредственно создаём Device
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
        // как img мы передаём название файла. Не сам файл, а название файла. Затем это название, мы будем получать
        // rating мы не указываем, так, как по дефолту он будет установлен в ноль
      });

      // (п.2) непосредственно создаём DeviceInfo. Это делается только после создания Device (п.1)
      if (info) {
        // не забываем, что когда данные приходят через form-data, они приходят в виде строки.
        // Поэтому массив info мы будем парсить: на фронте в JSON-строку, на бэкенде обратно перегонять в JS-объект
        info = JSON.parse(info);
        // После того, как мы распарсили массив info, с помощью forEach пробегаемся по нему.
        // Для каждого элементе массива вызываем фунцию create
        info.forEach((item) =>
          DeviceInfo.create({
            title: item.title,
            description: item.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device); // после создания устройства возвращаем информацию о нём обратно на клиент
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // получаем все устройства
  async getAll(req, res) {
    // Здесь будем принимать { brandId, typeId }, и если они не указаны, будем возвращать все девайсы.
    // Если, хотя бы один из них указан, будем делать некую фильтрацию
    let { brandId, typeId, limit, page } = req.query; // brandId, typeId будем получать из query, то есть из строки запроса
    page = page || 1;
    limit = limit || 9; // Если лимит не указан, то на страницу будем отправлять по 9 устройств
    // Посчитаем отступ. Допустим мы на второй странице и, первые 9 товаров нам надо пропустить (2 * 9 - 9 = 9 ). Отступ получается в 9 товаров
    let offset = page * limit - limit;

    // и затем сделаем несколько проверок:
    let devices;
    if (!brandId && !typeId) {
      // Если нет брэнда и нет типа, то тогда возвращаем все девайсы.
      devices = await Device.findAndCountAll({ limit, offset });
      // findAndCountAll() - функция для пагинации
    }
    if (brandId && !typeId) {
      // Если есть brandId и нет typeId, тогда будем делать фильтрацию только по брэнду
      // Каждый запрос у нас принимает объект опций, где мы указывали where. Здесь мы так же добавим limit и offset
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      // И наоборот, если есть тип и нет брэнда
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      // Если есть брэнд и тип
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }

  // получить поиск всех устройств по имени
  async getSearchAllDeviceByName(req, res, next) {
    try {
      let { limit, page, name, filter } = req.query;

      page = page || 1;
      limit = limit || 7;
      let offset = page * limit - limit;
      if (filter === "All") {
        const devices = await Device.findAndCountAll({
          attributes: ["name", "price", "img", "id"],
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          include: [
            {
              attributes: ["name"],
              model: Brand,
            },
            {
              attributes: ["name"],
              model: Type,
            },
          ],
          limit,
          offset,
        });

        return res.json(devices);
      } else {
        const devices = await Device.findAndCountAll({
          attributes: ["name", "price", "img", "id", "brandId", "typeId"],
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
            [Op.or]: [
              {
                brandId: null,
              },
              {
                typeId: null,
              },
            ],
          },
          include: [
            {
              attributes: ["name"],
              model: Brand,
            },
            {
              attributes: ["name"],
              model: Type,
            },
          ],
          limit,
          offset,
        });

        return res.json(devices);
      }
    } catch (e) {
      next(apiError.badRequest(e.message));
    }
  }

  // получаем одно устройство
  async getOne(req, res) {
    // В первую очередь получаем id устройства из параметров.
    // Этот параметр мы указывали в deviceRouter: router.get("/:id", deviceController.getOne);
    const { id } = req.params;
    // вызываем фунцию findOne()
    const device = await Device.findOne({
      where: { id },
      // помимо самого устройства, нам необходимо получить массив характеристик
      // include: [{ model: DeviceInfo, as: "info" }], это у Тимура
      include: [
        { model: DeviceInfo, as: "info" },
        { model: Type },
        { model: Brand },
      ], // это у Шкалупы
    });
    // возвращаем на клиент
    return res.json(device);
  }

  // удаляем устройство
  async delete(req, res) {
    try {
      // В первую очередь получаем id устройства из параметров.
      // Этот параметр мы указывали в deviceRouter.js
      // как router.delete("/:id", checkRole("ADMIN"), deviceController.delete);
      const { id } = req.params;

      // ищем в базе данных по { id } одно устройство, которое необходимо удалить
      await Device.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          // если находим, то удаляем его по условию { id }
          await Device.destroy({ where: { id } }).then(() => {
            // и возвращаем клиенту сообщение
            return res.json("Устройство удалено");
          });
        } else {
          // если устройства с указанным ID нет в базе данных, то возвращаем клиенту сообщение
          return res.json("Этого устройства нет в базе данных");
        }

        // удаляем устройство из OrderDevice
        await OrderDevice.destroy({ where: { deviceId: id } });
        // удаляем устройство из BasketDevice
        await BasketDevice.destroy({ where: { deviceId: id } });
      });
    } catch (e) {
      return res.json(e);
    }
  }

  // редактирование (обновление) устройства
  async update(req, res) {
    try {
      // В первую очередь получаем id устройства из параметров.
      // Этот параметр мы указывали в deviceRouter.js
      // как  router.put("/:id", checkRole("ADMIN"), deviceController.update);
      const { id } = req.params;
      //=========== ниже возможно вместо const надо писать let
      const { brandId, typeId, name, price, info } = req.body; // получаем из тела запроса

      // ищем в базе данных одно устройство по условию {id}
      await Device.findOne({ where: { id } }).then(async (data) => {
        // если находим
        if (data) {
          // создаём пустой объект, где в будущем будут храниться новые ключи и значения
          let newVal = {};
          // если есть ключ brandId, то записываем в него обновленое значение. Иначе false
          brandId ? (newVal.brandId = brandId) : false;
          // то же самое
          typeId ? (newVal.typeId = typeId) : false;
          name ? (newVal.name = name) : false;
          price ? (newVal.price = price) : false;

          // переписываем имя файла картинки
          if (req.files) {
            const { img } = req.files;
            const type = img.mimetype.split("/")[1];
            let fileName = uuid.v4() + `.${type}`;
            img.mv(path.resolve(__dirname, "..", "static", fileName));
            newVal.img = fileName;
          }

          if (info) {
            const parseInfo = JSON.parse(info);
            for (const item of parseInfo) {
              await DeviceInfo.findOne({ where: { id: item.id } }).then(
                async (data) => {
                  if (data) {
                    await DeviceInfo.update(
                      {
                        title: item.title,
                        description: item.description,
                      },
                      { where: { id: item.id } }
                    );
                  } else {
                    await DeviceInfo.create({
                      title: item.title,
                      description: item.description,
                      deviceId: id,
                    });
                  }
                }
              );
            }
          }

          await Device.update(
            {
              ...newVal,
            },
            { where: { id } }
          ).then(() => {
            return res.json("Устройство обновлено");
          });
        } else {
          return res.json("Устройства с таким ID нет в базе данных");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new DeviceController();
// На выходе из этого файла у нас будет новый объект, созданный из этого класса.
// Через точку будем обращаться к этим функциям, чтобы их вызывать, например DeviceController().check

// экспортируем в userRouter
// http://localhost:5000/api/device
