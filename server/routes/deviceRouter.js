const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), deviceController.create); // 2-м параметром не просто передаём, а вызываем middleware checkRole().
// Нам необходимо, чтобы после вызова этой фунции, как раз туда попал middleware. Парaметром передаём роль администратора.
// 3-м передаём фунцию create

router.get("/", deviceController.getAll);
router.get("/search", deviceController.getSearchAllDeviceByName);
router.get("/:id", deviceController.getOne);
router.delete("/:id", checkRole("ADMIN"), deviceController.delete);
router.put("/:id", checkRole("ADMIN"), deviceController.update);

module.exports = router;
