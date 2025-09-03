import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import Dashboard from "./Dashboard";

const freeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

function AddParkingSpot({ onAdd }) {
  useMapEvents({
    click(e) {
        console.log(e.latlng)
        const lng = e.latlng.lng
        const lat = e.latlng.lat
      //const { lat, lng } = e.latlng;
      axios.post("parking/", {
        lat: lat,
        lng: lng
      }, {
        headers: { Authorization: localStorage.getItem("token") } // JWT token admin
      })
      .then(res => {
        onAdd(res.data);
      })
      .catch(err => console.error(err));
    },
  });
  return null;
}

const AdminParkingMap = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    axios.get("parking/")
      .then(res => {setSpots(res.data)})
      .catch(err => console.error(err));

    console.log(spots)
  }, []);

  return (
    <>
    <MapContainer center={[36.8008, 10.1800]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />

      {spots && spots.map(spot => (
 
        <Marker
          key={spot._id}
          position={[spot.lat, spot.lng]}
          icon={freeIcon}
        >
          <Popup>
            Place #{spot._id} <br />
            {spot.city}
          </Popup>
        </Marker>
      ))}

      {/* Composant qui capte les clics sur la carte */}
      <AddParkingSpot onAdd={(newSpot) => setSpots([...spots, newSpot])} />
    </MapContainer>
    </>
  );
};

export default AdminParkingMap;