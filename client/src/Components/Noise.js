import { useEffect, useState } from "react";
import "../styles.css/Noise.css";

const Noise = () => {
  const [noiseLevel, setNoiseLevel] = useState("");
  const [noiseStatus, setNoiseStatus] = useState("");

  useEffect(() => {
    // Simulation : bruit aléatoire entre 30 et 100 dB
    const simulatedDb = Math.floor(Math.random() * (100 - 30 + 1)) + 30;

    let status;
    let level;

    if (simulatedDb < 50) {
      status = "Faible (zone calme)";
      level = "low";
    } else if (simulatedDb < 75) {
      status = "Modéré (zone urbaine)";
      level = "medium";
    } else {
      status = "Élevé (nuisance sonore)";
      level = "high";
    }

    setNoiseLevel(level);
    setNoiseStatus(`${simulatedDb} dB - ${status}`);
  }, []);

  return (
    <div className={`noise-container ${noiseLevel}`}>
      <h3>🔊 Niveau sonore</h3>
      <p className="noise-status">{noiseStatus}</p>
    </div>
  );
};

export default Noise;
