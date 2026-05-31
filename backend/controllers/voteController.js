const { getProvinceFromIdCard, isVoteAllowed } = require("../utils/province");

exports.vote = async (req, res, next) => {

  const user = req.user;
  const { terminalLocalisation } = req.body;

  const userProvince = getProvinceFromIdCard(user.idCard);

  if (!isVoteAllowed(userProvince, terminalLocalisation)) {
    return next(new ErrorHandler("Vote refusé : mauvais terminal", 403));
  }

  // enregistrer vote
  user.hasVoted = true;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Vote enregistré"
  });
};