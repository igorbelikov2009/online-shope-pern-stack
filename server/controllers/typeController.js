const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  // создаём типы
  async create(req, res) {
    const { name } = req.body; // из тела post-запроса (смотри typeRouter.js) методом деструктуризации извлекаем название типа
    const type = await Type.create({ name }); // затем, при помощи create этот тип мы создаём. Параметром в функцию мы передаём объект, где указываем нужные поля
    // достаточно передать название типа, а ID будет присвоен автоматически.
    return res.json(type);
  }
  // получаем типы
  async getAll(req, res) {
    // get-запрос (смотри typeRouter.js)
    const types = await Type.findAll(); // у модели Type вызываем функцию findAll(), которая вернёт нам все существующие записи, которые есть в базе данных у данной модели
    return res.json(types);
  }
}

module.exports = new TypeController();
// На выходе из этого файла у нас будет новый объект, созданный из этого класса.
// Через точку будем обращаться к этим функциям, чтобы их вызывать, например TypeController().check
// экспортируем в userRouter
// http://localhost:5000/api/type
