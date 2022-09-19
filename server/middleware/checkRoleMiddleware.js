const jwt = require("jsonwebtoken");

// Замыкание. Мы вызываем фунцию, передаём туда роль и эта функция возвращает нам middleware
module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      // если метод равен "OPTION", то пропускаем
      // Нас интересует только POST, GET, PUT, DELETE
      next();
    }
    try {
      // из headers.authorization нам необходимо выцепить токен
      // но, обычно, в headers помещают сначала тип токена (Bearer), затем сам токен
      const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
      if (!token) {
        // если токена нет, то будем возвращать ошибку
        return res.status(401).json({ message: "Не авторизован" });
      }

      // если токен есть, то нам надо его раскодировать и проверить на валидность с помощью фунции verify()
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // 1-ый парам - сам токен, 2-й - секретный ключ из переменного окружения .env
      // После того, как токен мы декодировали, необходимо выцепить оттуда роль пользователя и сравнить её с ролью, которую мы передали в middleware
      // Если они не совпадают, возвращаем ошибку

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
};
