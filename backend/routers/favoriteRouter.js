const { Router } = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = Router();

router.get("/", favoriteController.getAll);
router.delete("/:id", favoriteController.deleteOne);

module.exports = router;
