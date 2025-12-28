const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const router = Router();

router.get("/", categoryController.getAll);
// Ну тут типа получаем просто ВСЕ категории, которые есть в БД
router.get("/:id", categoryController.getOne);
// тут получаем просто одну какую-то категорию по айдишнику (хз зачем, пусть будет)
router.get("/:id/products", categoryController.getProducts);
// тут типа получаем все продукты, которые соответствуют ОДНОЙ категории

module.exports = router;
