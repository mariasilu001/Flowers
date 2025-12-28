const { Router } = require("express");
const productController = require("../controllers/productController");

const router = Router();

router.get("/", productController.getAll);
//ну по базе получаем все продукты из БД
router.get("/:id", productController.getOne);
// получаем только оин продукт по айдишнику

module.exports = router;
