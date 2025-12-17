const { Router } = require("express");
const cartController = require("../controllers/cartController");

const router = Router();

router.get("/", cartController.getAll);

module.exports = router;
