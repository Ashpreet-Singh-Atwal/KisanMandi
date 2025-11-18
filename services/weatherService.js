const axios = require("axios");

exports.getWeather = async (location = "Chandigarh") => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const { data } = await axios.get(url);

    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      desc: data.weather[0].description,
    };
  } catch (err) {
    console.log("Weather Error:", err);
    return null;
  }
};
