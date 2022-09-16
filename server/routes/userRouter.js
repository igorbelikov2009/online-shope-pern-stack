const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController"); // импортируем userController, и потом передаём в роутеры вторым параметром соответствующие фунции

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", userController.check); // проверяем, авторизован пользователь или нет

// router.get("/auth", (req, res) => {
//   res.json({ message: "All working!" });
// }); // req, res соответственно запрос и ответ

module.exports = router;
