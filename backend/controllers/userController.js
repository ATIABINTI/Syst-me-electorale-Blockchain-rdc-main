const User = require("../models/User");

// ================= GET USER =================
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { idCard } = req.body;

    const user = await User.findOne({ idCard });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ALL USERS =================
exports.allUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// ================= EDIT USER =================
exports.editUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  res.json(user);
};

// ================= LOGOUT =================
exports.logoutUser = (req, res) => {
  res.json({ message: "Logged out" });
};