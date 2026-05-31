// utils/jwtToken.js

const sendToken = (user, statusCode, res) => {
  // Générer le token
  const token = user.getJwtToken();

  // Options cookie
  const options = {
    expires: new Date(
      Date.now() +
        process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Envoi réponse
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;