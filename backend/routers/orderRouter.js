const { Router } = require("express");
const orderController = require("../controllers/orderController");

const router = Router();

router.get("/", orderController.getAll);
router.post("/", orderController.createOne);

module.exports = router;
