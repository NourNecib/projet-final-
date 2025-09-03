import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../styles.css/MyReports.css"; 

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const config = {
          headers: {
            authorisation: token,
          },
        };
        const res = await axios.get("/reports/my-reports", config);
        setReports(res.data.reports);
      } catch (error) {
        console.error("Erreur lors de la récupération des signalements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  return (
    <div className="my-reports-container">
      <h2> Mes Signalements</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : reports.length === 0 ? (
        <p>Vous n'avez fait aucun signalement.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Lieu</th>
              <th>Type</th>
              <th>Description</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>{report.location}</td>
                <td>{report.type}</td>
                <td>{report.description || "—"}</td>
                <td>{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReports;