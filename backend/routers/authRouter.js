const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/register", authController.register);
// эндпоинт регистрации пользователя (создает новую запись в таблице users в БД)
router.post("/login", authController.login);
// проверяе входные данные и дает пользователю токен авторизации, который дает права на хз что

module.exports = router;
