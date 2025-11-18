const Crop = require("../models/Crop");
const Order = require("../models/Order");
const User = require("../models/User");
const weatherService = require("../services/weatherService");
const mongoose = require("mongoose");

exports.dashboard = async (req, res) => {
  try {
    const farmer = await User.findById(req.session.user._id);

    console.log("FARMER SESSION ID:", req.session.user._id);

    const farmerId = new mongoose.Types.ObjectId(req.session.user._id);

    const crops = await Crop.find({ farmer: farmerId });
    console.log("FOUND CROPS:", crops);

    let weather = null;
    try {
      weather = await weatherService.getWeather(farmer.farmLocation || "Punjab");
    } catch (e) {
      weather = null;
    }

    const orders = await Order.find({
      crop: { $in: crops.map(c => c._id) }
    });

    const activeListings = crops.filter(c =>
        String(c.status).toLowerCase() === "active"
    ).length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const pendingOrders = orders.filter(o => o.status === "placed").length;

    const recentCrops = crops
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    
    const MSP_MASTER = [
  { crop: "Wheat", msp: 2150 },
  { crop: "Paddy", msp: 1940 },
  { crop: "Basmati Rice", msp: 4500 },
  { crop: "Maize", msp: 1700 },
  { crop: "Barley", msp: 1600 },
  { crop: "Mustard", msp: 4100 },
  { crop: "Cotton", msp: 6150 },
  { crop: "Sorghum", msp: 1450 },
  { crop: "Gram", msp: 5200 },
  { crop: "Pulses", msp: 4900 },
];

const mspList = recentCrops && recentCrops.length
  ? recentCrops.map(crop => {
      const master = MSP_MASTER.find(m => 
        m.crop.toLowerCase() === (crop.name || "").toString().toLowerCase()
      );
      return {
        name: crop.name,
        listedPrice: crop.price || 0,
        msp: master ? master.msp : null
      };
    })
  : MSP_MASTER.slice(0,5).map(m => ({ name: m.crop, listedPrice: null, msp: m.msp }));
    

    res.render("farmerDashboard", {
      farmer,
      weather,
      stats: {
        activeListings,
        totalRevenue,
        pendingOrders,
        avgRating: 0,
      },
      recentCrops,
      mspList,
      recentActivities: []
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).send("Error loading dashboard");
  }
};


exports.transactions = async (req, res) => {
    res.render("farmer/transactions", {});
};

exports.profilePage = async (req, res) => {
    res.render("farmer/profile", { farmer: req.session.user });
};


exports.activeListings = async (req, res) => {
  try {
    const farmerId = req.session.user._id;

    const listings = await Crop.find({
      farmer: farmerId,
      status: "active"
    });

    res.render("farmer/activeListings", {
      listings
    });

  } catch (err) {
    console.error("Active Listings Error:", err);
    res.status(500).send("Error loading active listings");
  }
};
