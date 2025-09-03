import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Bienvenue dans votre espace citoyen </h2>
      <p>Vous pouvez consulter vos signalements, réserver une place, etc.</p>

      <Link to="/my-reports">
        <button className="dashboard-button">Voir mes signalements</button>
      </Link>
    </div>
  );
};

export default UserDashboard;