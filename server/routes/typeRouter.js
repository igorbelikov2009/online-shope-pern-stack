const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
// const checkRole = require('../middleware/checkRoleMiddleware')

router.post("/", typeController.create); // в post метод передаём фунцию create
router.get("/", typeController.getAll); // а в get метод передаём фунцию getAll
// router.delete("/", typeController.delete);

module.exports = router;
