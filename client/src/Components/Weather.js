import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css/Weather.css";

const Weather = () => {
  const [temp, setTemp] = useState(null);
  const [descr, setDescr] = useState("");

  useEffect(() => {
    axios.get("/weather/current")
      .then(res => {
        setTemp(res.data.temperature);
        setDescr(res.data.description);
      })
      .catch(err => console.error(err));
  }, []);

  // Fonction pour retourner un emoji météo en fonction de la description
  const getWeatherEmoji = (description) => {
    if (!description) return "❓";
    const desc = description.toLowerCase();
    if (desc.includes("soleil") || desc.includes("ensoleillé")) return "☀️";
    if (desc.includes("nuage")) return "☁️";
    if (desc.includes("pluie")) return "🌧️";
    if (desc.includes("orage")) return "⛈️";
    if (desc.includes("neige")) return "❄️";
    return "🌡️";
  };

  return (
    <div className="weather-container">
      {temp !== null ? (
        <>
          <div className="weather-title">Météo actuelle à Tunis</div>
          <div className="weather-info">
            <div className="weather-icon">
              {getWeatherEmoji(descr)}
            </div>
            <div className="weather-details">
              <div className="weather-temp">{temp}°C</div>
              <div className="weather-description">{descr}</div>
            </div>
          </div>
        </>
      ) : (
        <p>Chargement de la météo…</p>
      )}
    </div>
  );
};

export default Weather;
