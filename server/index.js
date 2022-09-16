require("dotenv").config(); // чтобы сервер мог считывать наш файл из переменного окружения .env, необходимо сюда импортировать config() из модуля dotenv, который мы установили в самом начале
const express = require("express"); //  с помощью require мы можем импортировать модули в файл
const sequelize = require("./db"); // импортируем объект из файла db.js
const models = require("./models/models"); // импортируем модели таблиц (после этого таблицы оказываются в базе данных)
// настроим cors для того, чтобы мы могли отправлять запросы
const cors = require("cors");
// с начала импортируем cors из установок,
// затем передадим cors в функцию use(), которую мы вызываем у app - app.use(cors())
// так же в фунцию  use() передадим express.json() для того, чтобы наше приложение могло парсить json-формат - app.use(express.json());

const fileUpload = require("express-fileupload"); // импортируем пакет fileUpload
const router = require("./routes/index"); // импортируем основной роутер

const errorHandler = require("./middleware/ErrorHandlingMiddleware");
// middleware, который работает с ошибками, должен регистрироваться в самом конце

const path = require("path"); // у "express" вызываем фунцию static(), в которую необходимо будет передать путь до папки со статикой

const PORT = process.env.PORT || 5000;
/* const PORT = 5000; - указываем порт, на котором наше приложение будет работать.
 Статичное объявление порта - плохая практика, поэтому будем использовать переменное окружение .env */
// Получаем значение порта из переменного окружения (.env). Если переменная не задана, то будем указывать дефолтное значение 5000

const app = express(); // создаём объект app вызовом функции express, с него и будет начинаться запуск нашего приложения
app.use(cors());
app.use(express.json());

// нам необходимо явно указать серверу, что файлы из папки static неообходимо раздавать, как статику.
// чтобы мы могли спокойно их получать.
// У "express" вызываем фунцию static(), в которую необходимо будет передать путь до папки со статикой (const path = require("path"); см. выше)
app.use(express.static(path.resolve(__dirname, "static"))); // здесь воспользуемся модулем path и вызовем функцию resolve,
// где указываем текущую директорию, и, через запятую, название папки.
// Теперь мы можем получать все файлы по названию из папки  "static"

app.use(fileUpload({})); // регистрируем fileUpload, в параметре пустой объект с опциями
app.use("/api", router);

// app.get("/", (reg, res) => {
//   res.status(200).json({ message: "WORKING!!!" }); // можно проверить в браузере по http://localhost:5000/
// }); //====> это был проверочный код

// обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); // с её помощью будет осуществляться подключение к базе данных
    await sequelize.sync(); // сверяет состояние базы данных со схемой данных
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

// // вызываем функцию для подключения к базе данных
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// // У арр вызываем фунцию  listen, в которой указываем, какой порт должен прослушивать наш сервер;
// // вторым параметром передаём коллбэк, который отработает при успешном запуске сервера

// /* в терминале пишем npm run dev
// Server started on port 5000 -  server запустился
// */

// start(); // не забываем вызывать эту функцию подключения к базе данных
