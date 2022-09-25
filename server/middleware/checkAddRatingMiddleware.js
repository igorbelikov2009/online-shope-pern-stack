const { Rating, Device } = require("../models/models");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    // достаем из тела запроса (у созданного устройства (продукта) ) deviceId
    const { deviceId } = req.body;

    // из headers.authorization достаём токен, он идёт вторым вслед за типом токена
    const token = req.headers.authorization.split(" ")[1];

    // если токен есть, то нам надо его раскодировать и проверить на валидность с помощью фунции verify()
    const user = jwt.verify(token, process.env.SECRET_KEY); // 1-ый парам - сам токен, 2-й - секретный ключ из переменного окружения .env
    // к реквесту в поле user добавляем данные, которые мы вытащили из этого токена. И во всех функциях этот юзер будет доступен

    // проверяем наличие рейтинга у продукта по условию { where: { deviceId, userId: user.id }}
    const checkRating = await Rating.findOne({
      where: { deviceId, userId: user.id },
    });

    // проверяем наличие данного продукта по условию { where: { id: deviceId } }
    const checkDevice = await Device.findOne({ where: { id: deviceId } });

    if (!checkDevice) {
      return res.json("Продукт не существует в базе данных");
    } else if (checkRating && checkDevices) {
      return res.json("Вы уже ставили оценку этому продукту");
    }
  } catch (e) {
    return res
      .status(401)
      .json("Что-то пошло не так в checkAddRatingMiddleware.js");
  }
};
