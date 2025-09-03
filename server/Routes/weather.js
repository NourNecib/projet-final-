const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/current", async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Tunis&units=metric&appid=${apiKey}`
    );
    res.json({ temperature: data.main.temp, description: data.weather[0].description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de récupérer la météo" });
  }
});

module.exports = router;
