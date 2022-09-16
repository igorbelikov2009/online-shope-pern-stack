const { Sequelize } = require("sequelize"); // импортируем "sequelize" из установки, сразу делаем деструктуризацию

// в конструкторе будем указывать конфигурацию из файла .env
// экспортируем объект из этого класса

module.exports = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // Пароль входа в базу данных
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
