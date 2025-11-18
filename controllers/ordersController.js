const Order = require("../models/Order");
const Crop = require("../models/Crop");
const User = require("../models/User");

exports.listOrders = async (req, res) => {
  try {
    const farmerId = req.session.user._id;

    const crops = await Crop.find({ farmer: farmerId }).select("_id");
    const cropIds = crops.map(c => c._id);

    const orders = await Order.find({ crop: { $in: cropIds } })
      .sort({ createdAt: -1 })
      .populate("crop", "name")
      .populate("buyer", "name phone");

    res.render("farmer/orders", {
      orders,
      farmer: req.session.user
    });

  } catch (err) {
    console.error("Orders list error:", err);
    res.status(500).send("Error loading orders");
  }
};
