const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const farmer = await User.findById(req.session.user._id);
    res.render("farmer/profile", { farmer });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).send("Error loading profile");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const farmerId = req.session.user._id;
    const { name, phone, farmLocation } = req.body;

    await User.findByIdAndUpdate(farmerId, { name, phone, farmLocation }, { new: true });

    req.session.user = await User.findById(farmerId);

    res.redirect("/farmer/profile");
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).send("Error updating profile");
  }
};
