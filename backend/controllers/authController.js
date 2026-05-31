const User = require("../models/User");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.loginElector = catchAsyncErrors(async (req, res) => {
  const { numeroCarte, password } = req.body;

  const user = await User.findOne({ numeroCarte }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Carte électorale invalide"
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Mot de passe incorrect"
    });
  }

  const token = user.getJwtToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({
    success: true,
    user
  });
});