const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.get("/register", authController.register);

module.exports = router;
