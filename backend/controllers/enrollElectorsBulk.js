// controllers/enrollController.js

const User = require("../models/User");
const crypto = require("crypto");

// ville depuis ID
function getCityFromId(id) {
  if (id.startsWith("22")) return "Lubumbashi";
  if (id.startsWith("21")) return "Likasi";
  if (id.startsWith("20")) return "Kolwezi";
  if (id.startsWith("19")) return "Kinshasa";
  return "Unknown";
}

// password simple
function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

exports.enrollElectors = async (req, res) => {
  try {
    const electorsList = req.body;

    if (!Array.isArray(electorsList)) {
      return res.status(400).json({
        success: false,
        message: "Envoyer un tableau d’ID cartes"
      });
    }

    const createdUsers = [];

    for (let idCarte of electorsList) {

      const existing = await User.findOne({ numeroCarte: idCarte });
      if (existing) continue; // éviter doublon

      const passwordPlain = generatePassword();

      const blockchainHash = crypto
        .createHash("sha256")
        .update(idCarte)
        .digest("hex");

      const user = await User.create({
        name: `Electeur ${idCarte}`,
        numeroCarte: idCarte,
        password: passwordPlain, //  PAS HASH (middleware s’en charge)
        email: `${idCarte}@vote.cd`,
        city: getCityFromId(idCarte),
        blockchainHash
      });

      createdUsers.push({
        idCarte,
        password: passwordPlain
      });
    }

    res.status(201).json({
      success: true,
      users: createdUsers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};