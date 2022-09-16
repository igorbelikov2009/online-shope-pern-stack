const ApiError = require("../error/ApiError");

class UserController {
  async registration(reg, res) {}

  async login(reg, res) {}

  async check(reg, res, next) {
    const { id } = reg.query;
    if (!id) {
      return next(ApiError.badRequest("Не задан ID"));
    }
    res.json(id);
  }
}

module.exports = new UserController();
// На выходе из этого файла у нас будет новый объект, созданный из этого класса.
// Через точку будем обращаться к этим функциям, чтобы их вызывать, например UserController().check

// экспортируем в userRouter
