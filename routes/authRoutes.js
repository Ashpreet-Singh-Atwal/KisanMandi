const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.indexPage);
router.get("/login", authController.loginPage);
router.get("/register", authController.registerPage);

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

router.get("/logout", authController.logoutUser);

module.exports = router;
