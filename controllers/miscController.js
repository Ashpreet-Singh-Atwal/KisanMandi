const weatherService = require("../services/weatherService");

const MSP_MASTER = [
  { crop: "Wheat", msp: 2150 },
  { crop: "Paddy", msp: 1940 },
  { crop: "Cotton", msp: 6150 },
  { crop: "Gram", msp: 5200 },
  { crop: "Mustard", msp: 4100 },
  { crop: "Maize", msp: 1700 },
  { crop: "Barley", msp: 1600 }
];

exports.fullMspList = (req, res) => {
  res.render("farmer/mspList", { mspList: MSP_MASTER });
};

exports.marketPrices = (req, res) => {
  res.render("farmer/marketPrices", {});
};

exports.weatherPage = async (req, res) => {
  let weather = null;

  try {
    weather = await weatherService.getWeather(req.session.user.farmLocation || "Punjab");
  } catch (err) {
    weather = null;
  }

  res.render("farmer/weather", { weather });
};
