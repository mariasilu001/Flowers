const { Router } = require("express");
const orderController = require("../controllers/orderController");

const router = Router();

router.get("/", orderController.getAll);
//тут получаем список всех заказов одного юзера
router.post("/", orderController.createOne); // ОМГ этот эндпоиинт был сложным АААААА
// тут делаем заказ (все, что есть в корзине и чистим козину при этом)
router.get("/:id", orderController.getOne); //тут просто инфу об одном заказе получаем


module.exports = router;
