const weatherService = require("../services/weatherService");
const Crop = require("../models/Crop");

exports.showWeather = async (req, res) => {
  try {
    const farmer = req.session.user;
    const location = farmer && farmer.farmLocation ? farmer.farmLocation : "Punjab";

    let weather = null;
    try {
      weather = await weatherService.getWeather(location);
    } catch (err) {
      console.warn("Weather fetch failed:", err.message || err);
      weather = null;
    }

    res.render("farmer/weather", {
      weather,
      farmer
    });
  } catch (err) {
    console.error("Weather controller error:", err);
    res.status(500).send("Error loading weather");
  }
};
