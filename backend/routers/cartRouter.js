const { Router } = require("express");
const cartController = require("../controllers/cartController");

const router = Router();

router.get("/", cartController.getAll);
// ну типа все предметы из корзины ОДНОГО юзера получем
router.post("/", cartController.addProduct);
// добавляем предмет в корзину юзера (КАКОЙ юзерприходит в токене, КАКОЙ товар приходит в ТЕЛЕ запроса)
router.delete("/:id", cartController.removeProduct);
// тут по айдишнику просто удаляем полностью запись из корзины
router.put("/:id", cartController.removeOne);
// а тут типа тоже по айдишнику но уже сначала не удаляем, а типа уменьшаем количество, ну типа там две кнопочки будет юл
router.patch("/:id", cartController.addOne);

module.exports = router;
