const User = require("../models/User");

module.exports.requireFarmer = async (req, res, next) => {
  try {
    if (!req.session.user || req.session.user.role !== "farmer") {
      return res.redirect("/login");
    }
    const user = await User.findById(req.session.user._id);
    if (!user) return res.redirect("/login");
    req.user = user;
    next();
  } catch (err) {
    console.error("requireFarmer error:", err);
    res.redirect("/login");
  }
};

exports.requireBuyer = async (req, res, next) => {
  try {
    if (!req.session.user || req.session.user.role !== "buyer") {
      return res.redirect("/login");
    }
    const user = await User.findById(req.session.user._id);
    if (!user) return res.redirect("/login");
    req.user = user;
    next();
  } catch (err) {
    console.error("requireBuyer error:", err);
    res.redirect("/login");
  }
};
