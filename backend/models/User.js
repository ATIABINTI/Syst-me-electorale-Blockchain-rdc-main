const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: String,
  numeroCarte: {
    type: String,
    unique: true
  },
  bureau: String,
  statut: {
    type: String,
    default: "En attente"
  },
  blockchainHash: String
});

module.exports = mongoose.model("User", userSchema);