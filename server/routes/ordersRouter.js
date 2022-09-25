const Router = require("express");
const router = new Router();
const ordersController = require("../controllers/ordersController");
const checkRole = require("../middleware/checkRoleMiddleware");

/* 
    router.post('/', ordersController.create)
    router.get('/', checkRole("ADMIN"), ordersController.getAll)
    router.get('/:id', checkRole("ADMIN"), ordersController.getOne)
    router.put('/', checkRole("ADMIN"), ordersController.updateOrder)
    router.delete('/', checkRole("ADMIN"), ordersController.deleteOrder);

*/
// так. как выше не работает, делаем через function (req, res){}

router.post("/", function (req, res) {
  ordersController.create;
});

router.get("/", checkRole("ADMIN"), function (req, res) {
  ordersController.getAll;
});
router.get("/:id", checkRole("ADMIN"), function (req, res) {
  ordersController.getOne;
});
router.put("/", checkRole("ADMIN"), function (req, res) {
  ordersController.updateOrder;
});
router.delete("/", checkRole("ADMIN"), function (req, res) {
  ordersController.deleteOrder;
});

module.exports = router;
