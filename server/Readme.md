# STACK - технологий BACKEND

### Ссылка на исходный код https://github.com/utimur/online-store-full-course

1. NODE JS
2. Express
3. PostgreSQL - система управления базами данных
4. Sequelize - ORM для реляционных баз данных на nodejs

# Что будем делать?

1. Построим диограмму базы данных, состоящую из 8 таблиц.
2. Реализуем авторизацию пользователя по JWT - токену.
3. Полноценное Rest API интернет магазин электроники.

### Начало работы

# Создаём папки client и server

# cd server

### - Переходим в папку server

# В папке server создаём файл index.js, с него и начинаем

# npm init -y

- инициализируем проект, после чего в папке server появляется файл package.json

# npm install express pg pg-hstore sequelize cors dotenv

- устанавливаем зависимости

# npm install -D nodemon

nodemon нужен для того, чтобы при каждом изменении в коде не перезапускать сервер. Он будет перезапускать сервер автоматически

# После установки, следующим этапом в package.json

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
поменяем на
"scripts": {
"dev": "nodemon index.js"
},
который будет запускать приложение в режиме разработки

### уходим в index.js

### затем создаём db.js (database)

1. Устанавливаем на компьютер PostgreSQL https://www.postgresql.org/
2. Устанавливаем на компьютер pgAdmin https://www.pgadmin.org/
3. Создаём в PostgreSQL новую базу данных online-store-shkulipa
4. .env
5. db.js
6. скачать платформу Postman https://www.postman.com/downloads/
7. Создаем папку routes с маршрутами
8. # npm i express-fileupload Загрузка файла на NodeJS сервер

https://www.npmjs.com/package/express-fileupload

9.  Его регистрируем в index.js
10. # npm i uuid Чтобы сгенерировать уникальный идентификатор с помощью node.js (Nodejs UUID)

    https://www.npmjs.com/package/uuid

11. После создания контролерров приступаем к авторизации, устанавливаем несколько модулей

# npm i jsonwebtoken https://www.npmjs.com/package/jsonwebtoken

jsonwebtoken – это популярная реализация JWT. Вы можете добавить ее в свой проект JavaScript, запустив в терминале следующую команду: npm install jsonwebtoken. Далее импортируйте пакет в свои файлы: const jwt = require('jsonwebtoken'); Чтобы подписать токен, вам потребуется 3 компонента: Секретный ключ токена. Часть данных для хеширования. Срок действия токена. Импортируем их в userController.js

# npm i bcrypt https://www.npmjs.com/package/bcrypt

Это позволяет хэшировать и шифровать конфиденциальные данные, такие как пароли пользователей, перед их сохранением в базу данных. Импортируем их в userController.js
