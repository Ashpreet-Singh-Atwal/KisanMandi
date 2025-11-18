const Crop = require("../models/Crop");
const Order = require("../models/Order");
const User = require("../models/User");

exports.dashboard = async (req, res) => {
  try {
    const buyer = req.user;
    if (!buyer) return res.redirect("/login");

    // Stats
    const totalOrders = await Order.countDocuments({ buyer: buyer._id });

    const totalSpentAgg = await Order.aggregate([
      { $match: { buyer: buyer._id } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$totalPrice", 0] } } } }
    ]);
    const totalSpent = totalSpentAgg.length ? totalSpentAgg[0].total : 0;

    const activeShipments = await Order.countDocuments({
      buyer: buyer._id,
      status: { $in: ["processing", "shipped"] }
    });

    const trustedFarmers = await User.countDocuments({ role: "farmer" });

    const favorites = Array.isArray(buyer.favorites) ? buyer.favorites.length : 0;

    const recentOrders = await Order.find({ buyer: buyer._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "crop",
        select: "name price quantity farmer",
        populate: { path: "farmer", select: "name" }
      });

    const crops = await Crop.find({ status: "active" })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("farmer", "name location");

    const unreadNotifications = buyer.unreadNotifications || 0;

    const stats = {
      totalOrders,
      totalSpent,
      activeShipments,
      trustedFarmers,
      favorites,
      unreadNotifications
    };

    res.render("buyerDashboard", {
      buyer,
      crops,
      recentOrders,
      stats
    });
  } catch (err) {
    console.error("Buyer Dashboard Error:", err);
    res.status(500).send("Error loading buyer dashboard");
  }
};
