const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), typeController.create); // 2-м параметром не просто передаём, а вызываем middleware checkRole().
// Нам необходимо, чтобы после вызова этой фунции, как раз туда попал middleware. Парaметром передаём роль администратора.
// 3-м передаём фунцию create

router.get("/", typeController.getAll);
router.delete("/:id", checkRole("ADMIN"), typeController.delete);
// http://localhost:5000/api/type/7 удаляем в postmane через адресную строку, где id через слеш: /7
module.exports = router;
