const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const router = Router();

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.get("/:id/products", categoryController.getProducts);

module.exports = router;
