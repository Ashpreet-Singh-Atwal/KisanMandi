const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.indexPage = (req, res) => {
  res.render("index");
};

exports.loginPage = (req, res) => {
  res.render("loginPage");
};

exports.registerPage = (req, res) => {
  res.render("registerPage");
};

exports.registerUser = async (req, res) => {
  try {
    const { userType, name, phone, password, farmLocation, businessName } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      role: userType,
      name,
      phone,
      password: hashed,
      farmLocation,
      businessName,
    });

    await newUser.save();

    req.session.user = newUser;

    return res.redirect(
      newUser.role === "farmer" ? "/farmer/dashboard" : "/buyer/dashboard"
    );
  } catch (err) {
    console.log(err);
    res.send("Error registering user");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.send("No user found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Incorrect password");

    req.session.user = { _id: user._id, role: user.role };

    return res.redirect(user.role === "farmer" ? "/farmer/dashboard" : "/buyer/dashboard");
  } catch (err) {
    console.error("loginUser error:", err);
    res.send("Error logging in");
  }
};


exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
