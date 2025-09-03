import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../styles.css/AdminReports.css";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);

  const fetchReports = async () => {
    try {
      const config = {
        headers: { authorisation: token },
      };
      const res = await axios.get("/reports/all", config);
      setReports(res.data.reports);
    } catch (error) {
      console.error("Erreur de chargement", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `/reports/update/${id}`,
        { status: newStatus },
        { headers: { authorisation: token } }
      );
      fetchReports(); 
    } catch (error) {
      console.error("Erreur de mise à jour", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await axios.delete(`/reports/delete/${id}`, {
        headers: { authorisation: token },
      });
      fetchReports();
    } catch (error) {
      console.error("Erreur de suppression", error);
    }
  };

  return (
    <div className="admin-reports-container">
      <h2>Tous les signalements</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : reports.length === 0 ? (
        <p>Aucun signalement trouvé.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Utilisateur</th>
              <th>Lieu</th>
              <th>Type</th>
              <th>Description</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>{report.user?.fullName}</td>
                <td>{report.location}</td>
                <td>{report.type}</td>
                <td>{report.description || "—"}</td>
                <td>
                  <select
                    value={report.status}
                    onChange={(e) =>
                      handleStatusChange(report._id, e.target.value)
                    }
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="en_cours">En cours</option>
                    <option value="resolu">Résolu</option>
                  </select>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(report._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReports;