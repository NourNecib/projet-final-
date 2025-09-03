import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../styles.css/ReportForm.css";

const ReportForm = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("embouteillage");
  const [description, setDescription] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const token = useSelector((state) => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorisation: localStorage.getItem('token'),
      },
    };

    const reportData = {
      location,
      type,
      description
    };

    try {
      await axios.post("reports/add", reportData, config);
      setSuccessMsg(" Signalement envoyé avec succès !");
      setErrorMsg("");
      setLocation("");
      setType("embouteillage");
      setDescription("");
    } catch (error) {
      console.error(error);
      setErrorMsg(" Erreur lors de l'envoi du signalement.");
      setSuccessMsg("");
    }
  };

  return (
    <div className="report-form-container">
      <h2> Faire un signalement</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <label>📍 Lieu</label>
        <input
          type="text"
          placeholder="Votre localisation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label> Type de problème</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="embouteillage">Embouteillage</option>
          <option value="nuisance">Nuisance sonore</option>
          <option value="panne">Panne</option>
          <option value="autre">Autre</option>
        </select>

        <label> Description (optionnelle)</label>
        <textarea
          rows="4"
          placeholder="Décrivez le problème en quelques mots..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="submit-btn">Envoyer</button>
      </form>

      {successMsg && <p className="success-msg">{successMsg}</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

export default ReportForm;