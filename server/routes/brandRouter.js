const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), brandController.create); // в post метод передаём фунцию create
router.get("/", brandController.getAll); // а в get метод передаём фунцию getAll
router.delete("/:id", checkRole("ADMIN"), brandController.delete);
// http://localhost:5000/api/brand/7 удаляем в postmane через адресную строку, где id через слеш: /7
// checkRole("ADMIN") устанавливает запрет на действия пользователя, у которого нет роли "ADMIN".
// Этот пользователь не может добавлять, удалять, редактировать типы, брэнды, устройства.
// Эти действия дозволены только пользователю, который прошёл проверку checkRole("ADMIN")
module.exports = router;
