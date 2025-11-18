const Order = require("../models/Order");
const Crop = require("../models/Crop");

exports.listTransactions = async (req, res) => {
  try {
    const farmerId = req.session.user._id;
    const crops = await Crop.find({ farmer: farmerId }).select("_id");
    const cropIds = crops.map(c => c._id);

    const transactions = await Order.find({ crop: { $in: cropIds } })
      .sort({ createdAt: -1 })
      .populate("crop", "name")
      .populate("buyer", "name");

    res.render("farmer/transactions", {
      transactions,
      farmer: req.session.user
    });
  } catch (err) {
    console.error("Transactions listing error:", err);
    res.status(500).send("Error loading transactions");
  }
};
