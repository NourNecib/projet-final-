import { useEffect, useState } from "react";
import "../styles.css/Traffic.css"; 

const Traffic = () => {
  const [trafficStatus, setTrafficStatus] = useState("Chargement...");
  const [trafficLevel, setTrafficLevel] = useState(""); 

  useEffect(() => {
    const heure = new Date().getHours();
    let status;
    let level;

    if (heure >= 7 && heure < 9) {
      status = "Trafic dense (heures de pointe)";
      level = "heavy";
    } else if (heure >= 17 && heure < 19) {
      status = "Trafic modéré";
      level = "moderate";
    } else {
      status = "Trafic fluide";
      level = "light";
    }

    setTrafficStatus(status);
    setTrafficLevel(level);
  }, []);

  return (
    <div className={`traffic-container ${trafficLevel}`}>
      <h3>🚗 État du trafic à Tunis</h3>
      <p className="traffic-status">{trafficStatus}</p>
    </div>
  );
};

export default Traffic;
