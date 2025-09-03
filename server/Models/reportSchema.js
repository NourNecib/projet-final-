const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["embouteillage", "nuisance", "panne", "autre"], 
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["nouveau", "en cours", "résolu"],
    default: "nouveau",
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;