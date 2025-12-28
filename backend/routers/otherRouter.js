const { Router } = require("express");
const otherController = require("../controllers/otherController");

const router = Router();

router.get("/pay-methods", otherController.getPayMeth);
// Ну это чтобы методы оплаты получать это для фронта надо типа

module.exports = router;
