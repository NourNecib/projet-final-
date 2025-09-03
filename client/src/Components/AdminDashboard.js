import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Espace Administrateur </h2>
      <p>Vous pouvez voir tous les signalements, gérer les utilisateurs, etc.</p>

      <Link to="/admin-reports">
        <button className="dashboard-button">Gérer les signalements</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;