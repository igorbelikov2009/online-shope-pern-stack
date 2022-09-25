const {
  Basket,
  BasketDevice,
  Device,
  DeviceInfo,
} = require("../models/models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

//=======================================
// class BasketController {
//   // добавить устройство (товар в корзину)
//   async addDevice(req, res) {
//     try {
//       // получаем id из тела запроса
//       const { id } = req.body;

//       // из headers.authorization нам необходимо выцепить токен
//       // где токен находится вторым после типа токена
//       const token = req.headers.authorization.split(" ")[1];

//       // раскодируем токен и проверим на валидность с помощью фунции verify()
//       const user = jwt.verify(token, process.env.SECRET_KEY); // 1-ый парам - сам токен, 2-й - секретный ключ из переменного окружения .env
//       // к реквесту в поле user добавляем данные, которые мы вытащили из этого токена. И во всех функциях этот юзер будет доступен

//       // находим корзину этого пользователя по условию { where: { userId: user.id } }
//       const basket = await Basket.findOne({ where: { userId: user.id } });

//       // в этой корзине добавляем товар через create
//       await BasketDevice.create({ basketId: basket.id, deviceId: id });
//       return res.json("Товар добавлен в корзину");
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   // получить содержимое корзины (весь товар из  корзины)
//   async getDevices(req, res) {
//     try {
//       // получаем токен
//       const token = req.headers.authorization.split(" ")[1];

//       // раскодируем токен и проверим на валидность с помощью фунции verify()
//       const user = jwt.verify(token, process.env.SECRET_KEY);

//       // получаем
//       const { id } = await Basket.findOne({ where: { userId: user.id } });

//       // находим корзину этого пользователя по условию { where: { basketId: id } } }
//       const basket = await BasketDevice.findAll({ where: { basketId: id } });

//       const basketArr = [];
//       for (let i = 0; i < basket.length; i++) {
//         const basketDevice = await Device.findOne({
//           where: {
//             id: basket[i].deviceId,
//           },
//           include: {
//             model: DeviceInfo,
//             as: "info",
//             where: {
//               deviceId: basket[i].deviceId,
//               [Op.or]: [
//                 {
//                   deviceId: {
//                     [Op.not]: null,
//                   },
//                 },
//               ],
//             },
//             required: false,
//           },
//         });
//         basketArr.push(basketDevice);
//       }

//       return res.json(basketArr);
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   // удалить продукт из корзины
//   async deleteDevice(req, res) {
//     try {
//       const { id } = req.params;
//       const user = req.user;

//       await Basket.findOne({ where: { userId: user.id } }).then(
//         async (userBasket) => {
//           if (userBasket.userId === user.id) {
//             await BasketDevice.destroy({
//               where: { basketId: userBasket.id, deviceId: id },
//             });
//           }
//           return res.json(
//             `You haven't access for delete the device(${id}) from basket that didn't belong to you`
//           );
//         }
//       );
//       return res.json("Product deleted form your card");
//     } catch (e) {
//       console.error(e);
//     }
//   }
// }
//=======================================

class BasketController {
  async addDevice(req, res) {
    try {
      const { id } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      await BasketDevice.create({ basketId: basket.id, deviceId: id });
      return res.json("Product added in card");
    } catch (e) {
      console.error(e);
    }
  }

  async getDevices(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = await Basket.findOne({ where: { userId: user.id } });
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

  async deleteDevice(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      await Basket.findOne({ where: { userId: user.id } }).then(
        async (userBasket) => {
          if (userBasket.userId === user.id) {
            await BasketDevice.destroy({
              where: { basketId: userBasket.id, deviceId: id },
            });
          }
          return res.json(
            `You haven't access for delete the device(${id}) from basket that didn't belong to you`
          );
        }
      );
      return res.json("Product deleted form your card");
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new BasketController();
