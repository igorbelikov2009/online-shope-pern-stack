const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");

router.post("/", brandController.create); // в post метод передаём фунцию create
router.get("/", brandController.getAll); // а в get метод передаём фунцию getAll

module.exports = router;
