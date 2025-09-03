const express = require("express");
const router = express.Router();
const ParkingSpot = require("../Models/parkingSpot");
const isAuth = require("../Middlewares/isAuth");


router.get("/spots", isAuth, async (req, res) => {
  try {
    const spots = await ParkingSpot.find();

    // Vérification des expirations
    for (const spot of spots) {
      if (
        !spot.isAvailable &&
        spot.reservation &&
        new Date(spot.reservation.endTime) < new Date()
      ) {
        // La réservation est expirée, on libère la place
        spot.isAvailable = true;
        spot.reservedBy = null;
        spot.reservation = null;
        await spot.save();
      }
    }

    res.send({ spots });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erreur serveur" });
  }
});


router.put("/reserve/:id", isAuth, async (req, res) => {
  const spot = await ParkingSpot.findById(req.params.id);
  if (!spot || !spot.isAvailable) return res.status(400).send({ msg: "Impossible de réserver" });

  spot.isAvailable = false;
  spot.reservedBy = req.user._id;
  await spot.save();
  res.send({ msg: "Réservé" });
});


// ➕ Ajouter une place (seulement admin)
router.post("/", async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    const { lat, lng, isAvailable } = req.body;
    const spot = new ParkingSpot({ lat, lng, isAvailable });
    await spot.save();

    res.json(spot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Récupérer toutes les places
router.get("/", async (req, res) => {
  try {
    const spots = await ParkingSpot.find();

    for (const spot of spots) {
      if (
        !spot.isAvailable &&
        spot.reservation &&
        new Date(spot.reservation.endTime) < new Date()
      ) {
        spot.isAvailable = true;
        spot.reservedBy = null;
        spot.reservation = null;
        await spot.save();
      }
    }

    res.json(spots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Récupérer les places d’une ville spécifique
router.get("/:city", async (req, res) => {
  try {
    const spots = await ParkingSpot.find({ city: req.params.city });
    res.json(spots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Modifier une place
router.put("/:id", async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const spot = await ParkingSpot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(spot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Supprimer une place
router.delete("/:id", async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await ParkingSpot.findByIdAndDelete(req.params.id);
    res.json({ message: "Parking spot deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id/reserve", async (req, res) => {
  try {
    const { userId, hours } = req.body;

    if (hours > 2) {
      return res.status(400).json({ error: "You can reserve max 2 hours" });
    }

    const spot = await ParkingSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ error: "Spot not found" });
    if (!spot.isAvailable) return res.status(400).json({ error: "Spot already reserved" });

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + hours * 60 * 60 * 1000);

    spot.isAvailable = false;
    spot.reservation = { userId, startTime, endTime };
    await spot.save();

    res.json(spot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;