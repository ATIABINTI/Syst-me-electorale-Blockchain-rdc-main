const User = require("../models/User");
const crypto = require("crypto");

exports.enrollElector = async (req, res) => {
  try {
    const { nom, numeroCarte, bureau } = req.body;

    const hash = crypto
      .createHash("sha256")
      .update(numeroCarte)
      .digest("hex");

    const elector = await User.create({
      nom,
      numeroCarte,
      bureau,
      statut: "Validé",
      blockchainHash: hash
    });

    res.status(201).json(elector);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getElecteurs = async (req, res) => {
  const electeurs = await User.find();
  res.json(electeurs);
};

exports.deleteElecteur = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Electeur supprimé" });
};