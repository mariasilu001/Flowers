const { Router } = require("express");
const productController = require("../controllers/productController");
const upload = require("../middleware/uploadFiles.js"); // Импортируем нашего грузчика


const router = Router();

router.get("/", productController.getAll);
//ну по базе получаем все продукты из БД
router.get("/:id", productController.getOne);
// получаем только оин продукт по айдишнику
router.post("/", upload.single('image'), productController.create);
// создаем новый продукт. второй аргумент - ПО для загрузки картинок

module.exports = router;
