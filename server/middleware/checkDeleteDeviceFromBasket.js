const { Basket, BasketDevice } = require("../models/models");
const jwt = require("jsonwebtoken");

// мы вызываем функцию, пердаём туда (req, res, next)
module.exports = async function (req, res, next) {
  try {
    // получаем id устройства из параметров.
    // Этот параметр мы указывали в basketRouter.js
    // router.delete( "/:id",authMiddleware, checkDeleteDeviceFromBasket, basketController.deleteDevice );
    const { id } = req.params;

    // получаем user из req.user
    const user = req.user;

    // находим корзину пользователя по условию { where: { userId: user.id } }
    const userBasket = await Basket.findOne({ where: { userId: user.id } });

    // находим один определённый элемент корзины по условию { where: { basketId: userBasket.id, deviceId: id } }
    const deviceItem = await BasketDevice.findOne({
      where: { basketId: userBasket.id, deviceId: id },
    });
    // если определённый элемент корзины найден
    if (deviceItem) {
      // вызываем функцию  next(), и этим мы вызываем следующий в цепочке middleware (связь с userRouter)
      return next();
    }
    // если определённый элемент корзины не найден, то возвращаем на клиент сообщение ошибки
    return res.json("Устройство не найдено в корзине пользователя");
  } catch (e) {
    res.json(e);
  }
};
