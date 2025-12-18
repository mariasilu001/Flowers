const { Router } = require("express");
const cartController = require("../controllers/cartController");

const router = Router();

router.get("/", cartController.getAll);
router.post("/", cartController.addProduct);
router.delete("/:id", cartController.removeProduct);
router.put("/:id", cartController.removeOne);

module.exports = router;
