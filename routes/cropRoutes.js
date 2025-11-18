const express = require("express");
const router = express.Router();

const cropController = require("../controllers/cropController");
const { requireFarmer } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/crops", requireFarmer, cropController.listCrops);

router.get("/crops/add", requireFarmer, cropController.addCropPage);

router.post("/crops/add", requireFarmer, upload.single("image"), cropController.addCrop);

router.get("/crops/edit/:id", requireFarmer, cropController.editCropPage);

router.post("/crops/edit/:id", requireFarmer, upload.single("image"), cropController.updateCrop);

router.get("/crops/delete/:id", requireFarmer, cropController.deleteCrop);

module.exports = router;
