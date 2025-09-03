const express = require("express");
const router = express.Router();
const Report = require("../Models/reportSchema");
const isAuth = require("../Middlewares/isAuth");


router.post("/add", isAuth, async (req, res) => {
  try {
    const { location, type, description } = req.body;
    const newReport = new Report({
      location,
      type,
      description,
      user: req.user._id,
    });
    await newReport.save();
    res.status(201).send({ msg: "Signalement ajouté", report: newReport });
  } catch (error) {
    res.status(500).send({ msg: "Erreur serveur", error });
  }
});


router.get("/my-reports", isAuth, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({ date: -1 });
    res.send({ reports });
  } catch (error) {
    res.status(500).send({ msg: "Erreur serveur", error });
  }
});


router.get("/all", isAuth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).send({ msg: "Accès interdit" });
    }

    const reports = await Report.find()
      .populate("user", "fullName email")
      .sort({ date: -1 });

    res.send({ reports });
  } catch (error) {
    res.status(500).send({ msg: "Erreur serveur", error });
  }
});


router.put("/update/:id", isAuth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).send({ msg: "Accès interdit" });
    }

    const { status } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).send({ msg: "Signalement introuvable" });
    }

    res.send({ msg: "Statut mis à jour", report: updatedReport });
  } catch (error) {
    res.status(500).send({ msg: "Erreur serveur", error });
  }
});


router.delete("/delete/:id", isAuth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).send({ msg: "Accès interdit" });
    }

    const deletedReport = await Report.findByIdAndDelete(req.params.id);

    if (!deletedReport) {
      return res.status(404).send({ msg: "Signalement introuvable" });
    }

    res.send({ msg: "Signalement supprimé" });
  } catch (error) {
    res.status(500).send({ msg: "Erreur serveur", error });
  }
});

module.exports = router;