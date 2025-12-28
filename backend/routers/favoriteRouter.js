const { Router } = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = Router();

router.get("/", favoriteController.getAll);
// ну тут получаем все записи из favorites одного юхера (по токену)
router.delete("/:id", favoriteController.deleteOne);
// тут удаляем одну запись по айдишнику
router.post("/", favoriteController.createOne);

module.exports = router;
