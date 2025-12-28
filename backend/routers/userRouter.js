const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/me", userController.getOnePublic);
//ну тут пользователь может получить только себя (по токену) это штука для профилей

module.exports = router;
