// Здесь мы будем декодировать токен и проверять его на валидность.
// Если токен не валидный, то будем возвращать ошибку о том, что пользователь не авторизованн

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTION") {
    // если метод равен "OPTION", то пропускаем
    // Нас интересует только POST, GET, PUT, DELETE
    next();
  }
  try {
    // из headers.authorization нам необходимо выцепить токен
    // но, обычно, в headers помещают сначала тип токена, затем сам токен
    const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
    if (!token) {
      // если токена нет, то будем возвращать ошибку
      return res.status(401).json({ message: "Не авторизован" });
    }
    // если токен есть, то нам надо его раскодировать и проверить на валидность с помощью фунции verify()
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // 1-ый парам - сам токен, 2-й - секретный ключ из переменного окружения .env
    // к реквесту в поле user добавляем данные, которые мы вытащили из этого токена. И во всех функциях этот юзер будет доступен
    req.user = decoded;
    // вызываем функцию  next(), и этим мы вызываем следующий в цепочке middleware (связь с userRouter)
    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован" });
  }
};
