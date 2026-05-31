exports.loginElector = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Login électeur OK"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};