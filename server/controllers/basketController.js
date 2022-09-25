const {
  Basket,
  BasketDevice,
  Device,
  DeviceInfo,
} = require("../models/models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class BasketController {
  // добавить устройство (товар в корзину)
  async addDevice(req, res) {
    try {
      const { id } = req.body; // из тела post-запроса (смотри basketRouter.js и models.js)
      // методом деструктуризации извлекаем id устройства, которое собираемся положить в корзину

      const token = req.headers.authorization.split(" ")[1]; // нам необходимо выцепить токен,
      // из headers.authorization, где токен находится вторым после типа токена [bearer, token]

      const user = jwt.verify(token, process.env.SECRET_KEY); // раскодируем токен
      // и проверим на валидность с помощью функции verify()
      // 1-ый парам - сам токен, 2-й - секретный ключ из переменного окружения .env
      // к реквесту в поле user добавляем данные, которые мы вытащили из этого токена. И во всех функциях этот юзер будет доступен

      const basket = await Basket.findOne({ where: { userId: user.id } }); // находим корзину
      // этого пользователя по условию { where: { userId: user.id } }

      // в эту корзину добавляем товар через create
      await BasketDevice.create({ basketId: basket.id, deviceId: id });
      return res.json("Товар добавлен в корзину");
    } catch (e) {
      console.error(e);
    }
  }

  // получить содержимое корзины (весь товар из  корзины)
  async getDevices(req, res) {
    try {
      // получаем токен
      const token = req.headers.authorization.split(" ")[1];

      // раскодируем токен и проверим на валидность с помощью фунции verify()
      const user = jwt.verify(token, process.env.SECRET_KEY);

      // получаем
      const { id } = await Basket.findOne({ where: { userId: user.id } });

      // находим корзину этого пользователя по условию { where: { basketId: id } } }
      const basket = await BasketDevice.findAll({ where: { basketId: id } });

      const basketArr = [];
      for (let i = 0; i < basket.length; i++) {
        const basketDevice = await Device.findOne({
          where: {
            id: basket[i].deviceId,
          },
          include: {
            model: DeviceInfo,
            as: "info",
            where: {
              deviceId: basket[i].deviceId,
              [Op.or]: [
                {
                  deviceId: {
                    [Op.not]: null,
                  },
                },
              ],
            },
            required: false,
          },
        });
        basketArr.push(basketDevice);
      }

      return res.json(basketArr);
    } catch (e) {
      console.error(e);
    }
  }

  // удалить продукт из корзины
  async deleteDevice(req, res) {
    try {
      const { id } = req.params; // В первую очередь получаем id устройства из параметров.
      // Этот параметр мы указывали в basketRouter.js
      // router.delete( "/:id", authMiddleware, checkDeleteDeviceFromBasket, basketController.deleteDevice );

      const user = req.user;

      // находим корзину пользователя оп условию { where: { userId: user.id } }
      await Basket.findOne({ where: { userId: user.id } }).then(
        async (userBasket) => {
          if (userBasket.userId === user.id) {
            await BasketDevice.destroy({
              where: { basketId: userBasket.id, deviceId: id },
            });
            return res.json("Товар удален с вашей корзины");
          }
          return res.json(
            `У вас нет доступа для удаления устройства(${id}) из корзины, которая вам не принадлежала`
          );
        }
      );
      // return res.json("Товар удален с вашей корзины");
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new BasketController();
