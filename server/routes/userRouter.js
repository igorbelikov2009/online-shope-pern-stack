const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController"); // импортируем userController, и потом передаём в роутеры вторым параметром соответствующие фунции
const authMiddleware = require("../middleware/authMiddleware"); //  импортируем authMiddleware и передаём его вторым параметром в get-запрос,
// который будет проверять пользователя на его авторизоанность

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check); // проверяем, авторизован пользователь или нет

// router.get("/auth", (req, res) => {
//   res.json({ message: "All working!" });
// }); // req, res соответственно запрос и ответ

module.exports = router;
