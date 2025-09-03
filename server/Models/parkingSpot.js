const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date }
});

const ParkingSpotSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  isAvailable: { type: Boolean, default: true },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  reservation: reservationSchema
});

module.exports = mongoose.model("ParkingSpot", ParkingSpotSchema);