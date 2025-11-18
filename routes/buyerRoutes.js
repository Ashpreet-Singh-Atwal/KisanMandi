const express = require("express");
const router = express.Router();
const { requireBuyer } = require("../middleware/authMiddleware");

const buyerController = require("../controllers/buyerController");

router.get("/dashboard", requireBuyer, buyerController.dashboard);

module.exports = router;
