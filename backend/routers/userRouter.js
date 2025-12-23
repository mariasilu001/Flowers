const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/me", userController.getOnePublic);

module.exports = router;
