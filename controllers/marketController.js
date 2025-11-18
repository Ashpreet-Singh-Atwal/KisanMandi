const marketService = require("../services/marketService");
const mspService = require("../services/mspService");

exports.marketPrices = async (req, res) => {
  try {
    const market = await marketService.getMarketPrices();
    res.render("farmer/marketPrices", {
      market,
      farmer: req.session.user
    });
  } catch (err) {
    console.error("Market prices error:", err);
    res.status(500).send("Error loading market prices");
  }
};

exports.mspList = async (req, res) => {
  try {
    const mspList = await mspService.getMSPList();
    res.render("farmer/mspList", {
      mspList,
      farmer: req.session.user
    });
  } catch (err) {
    console.error("MSP list error:", err);
    res.status(500).send("Error loading MSP list");
  }
};
