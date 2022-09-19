const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), typeController.create); // 2-м параметром не просто передаём, а вызываем middleware checkRole().
// Нам необходимо, чтобы после вызова этой фунции, как раз туда попал middleware. Парaметром передаём роль администратора.
// 3-м передаём фунцию create

// router.post("/", typeController.create);

router.get("/", typeController.getAll);

module.exports = router;
