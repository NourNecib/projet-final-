import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const freeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png", // Vert
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

const reservedIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png", // Rouge
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

const ParkingMap = () => {
  const [spots, setSpots] = useState([]);

  const fetchSpots = () => {
    axios
      .get("/parking/", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setSpots(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSpots();

    // Auto-refresh toutes les 30s
    const interval = setInterval(fetchSpots, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleReserve = async (spotId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("❌ Utilisateur non connecté");
        return;
      }

      await axios.put(
        `/parking/${spotId}/reserve`,
        { userId: user._id, hours: 2 },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("✅ Réservation réussie !");
      fetchSpots();
    } catch (err) {
      console.error(err);
      alert("❌ Réservation échouée.");
    }
  };

  // Fonction pour détecter si une réservation est expirée
  const isSpotExpired = (spot) => {
    if (!spot.reservation || !spot.reservation.endTime) return false;
    return new Date(spot.reservation.endTime) < new Date();
  };

  return (
    <MapContainer
      center={[36.8008, 10.1800]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {spots.map((spot) => {
        const expired = isSpotExpired(spot);
        const isFree = spot.isAvailable || expired;

        return (
          <Marker
            key={spot._id}
            position={[spot.lat, spot.lng]}
            icon={isFree ? freeIcon : reservedIcon}
          >
            <Popup>
              <div>
                <p>Place #{spot._id}</p>
                <p>
                  Statut : {isFree ? "Libre ✅" : "Occupée ❌"}
                </p>
                {!isFree && spot.reservation && (
                  <p>
                    Réservée jusqu’à :{" "}
                    {new Date(spot.reservation.endTime).toLocaleTimeString()}
                  </p>
                )}
                {isFree && (
                  <button onClick={() => handleReserve(spot._id)}>
                    Réserver 2h
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ParkingMap;
