const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordersController");
const { requireFarmer } = require("../middleware/authMiddleware");

router.get("/", requireFarmer, orderController.listOrders);

module.exports = router;
