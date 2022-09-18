const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt"); // импортируем модуль bcrypt
const jwt = require("jsonwebtoken"); // импортируем файль контроллера модуля jsonwebtoken
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    // ===== http://localhost:5000/api/user/registration
    const { email, password, role } = req.body; //  из тела запроса получаем email, password и rol
    if (!email || !password) {
      // Проверяем: если email и password пустые, то возвращаем ошибку на клиент
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    // Следующим этапом проверяем: существует ли пользователь с таким email в системе.
    // Возможно, кто-то под этим email уже пытался зарегистрировать пользователя или пытается
    const candidate = await User.findOne({ where: { email } });
    // проверяем: если нам вернулся пользователь и он не пустой, то тогда  возвращаем ошибку на клиент
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    // если такое условие не выполнилось, пользователя с таким email  мы не нашли,
    // тогда мы можем захешировать пароль и создать нового пользователя с таким email

    const hashPassword = await bcrypt.hash(password, 5); // первый параметр - сам пароль, который мы получали в теле запроса,
    // второй - число, сколько раз мы будем его хеширвать

    // создаём пользователя, передаём туда email, rol и password с хешированным значением
    const user = await User.create({ email, role, password: hashPassword });

    // сразу же для пользователя создаём корзину, вызываем create у модели basket, передаём туда ID пользователя, который получаем у уже созданного объекта пользователя
    const basket = await Basket.create({ userId: user.id });

    // затем нам надо сгенерировать jsonwebtoken. Вызываем функцию sign и в неё необходимо передать некоторые данные
    // 1-ым параметром передаётся объект, тот самый payload, центральная часть jwt-токена, в которую будут вшиваться какие-то данные
    // 2-ым параметром передаётся секретный ключ, который можно захаркодить прямо здесь, но мы вынесем его в файл .env с переменными окружениями
    // 3-м параметром принимаются опции: expiresIn - сколько живет токен
    const token = generateJwt(user.id, user.email, user.role);

    // после того, как токен сгенерирован, возвращаем его на клиент
    return res.json({ token });
  }

  async login(reg, res) {
    // ===== http://localhost:5000/api/user/login
  }

  async check(reg, res, next) {
    // ===== http://localhost:5000/api/user/check
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
