const express = require("express");
const router = express.Router();

const farmerController = require("../controllers/farmerController");
const cropController = require("../controllers/cropController");
const ordersController = require("../controllers/ordersController");
const marketController = require("../controllers/marketController");
const weatherController = require("../controllers/weatherController");
const transactionsController = require("../controllers/transactionsController");
const profileController = require("../controllers/profileController");

const { requireFarmer } = require("../middleware/authMiddleware");

router.get("/dashboard", requireFarmer, farmerController.dashboard);

router.get("/crops", requireFarmer, cropController.listCrops);
router.get("/crops/add", requireFarmer, cropController.addCropPage);
router.post("/crops/add", requireFarmer, cropController.addCrop);
router.get("/crops/edit/:id", requireFarmer, cropController.editCropPage);
router.post("/crops/edit/:id", requireFarmer, cropController.updateCrop);
router.get("/crops/delete/:id", requireFarmer, cropController.deleteCrop);

router.get("/orders", requireFarmer, ordersController.listOrders);

router.get("/market-prices", requireFarmer, marketController.marketPrices);
router.get("/msp", requireFarmer, marketController.mspList);

router.get("/weather", requireFarmer, weatherController.showWeather);

router.get("/transactions", requireFarmer, transactionsController.listTransactions);

router.get("/profile", requireFarmer, profileController.getProfile);
router.post("/profile", requireFarmer, profileController.updateProfile);

router.get("/listings", requireFarmer, farmerController.activeListings);

module.exports = router;
