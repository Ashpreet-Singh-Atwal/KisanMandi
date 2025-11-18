const Crop = require("../models/Crop");
const Order = require("../models/Order");

exports.getFarmerDashboardData = async (farmerId) => {
  
  const activeListings = await Crop.countDocuments({
    farmer: farmerId,
    status: "active",
  });

  const totalRevenueAgg = await Order.aggregate([
    { $match: { farmer: farmerId } },
    { $group: { _id: null, sum: { $sum: "$totalPrice" } } },
  ]);

  const totalRevenue =
    totalRevenueAgg.length > 0 ? totalRevenueAgg[0].sum : 0;

  const pendingOrders = await Order.countDocuments({
    farmer: farmerId,
    status: "placed",
  });

  const recentCrops = await Crop.find({ farmer: farmerId })
    .sort({ createdAt: -1 })
    .limit(4);

  const avgRating = 4.5;

  return {
    activeListings,
    totalRevenue,
    pendingOrders,
    recentCrops,
    avgRating,
  };
};
