import Weather from "./Weather";
import Traffic from "./Traffic";
import Noise from "./Noise";
import "../styles.css/Dashboard.css"; 

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">📊 Tableau de bord urbain</h2>

      {isAdmin && (
        <div className="dashboard-button-container">
          <a href="/test">
            <button className="dashboard-button">➕ Ajoutez des spots</button>
          </a>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <Weather />
        </div>
        <div className="dashboard-card">
          <Traffic />
        </div>
        <div className="dashboard-card">
          <Noise />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
