const express = require("express");
const router = express.Router();

const {
  getUser,
  registerUser,
  loginUser,
  allUsers,
  deleteUser,
  logoutUser,
  editUser,
} = require("../controllers/userController");

const { vote } = require("../controllers/voteController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");


// ================= AUTH =================

// 🔐 Login avec ID carte
router.post("/login", loginUser);

// 🚪 Logout
router.get("/logout", logoutUser);


// ================= USER =================

// 👤 profil utilisateur connecté
router.get("/me", isAuthenticatedUser, getUser);

// ✏ modifier utilisateur
router.put("/edit", isAuthenticatedUser, editUser);


// ================= VOTE =================

// 🗳 voter
router.post("/vote", isAuthenticatedUser, vote);


// ================= ADMIN =================

// ➕ enrôlement électeur
router.post(
  "/register",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  registerUser
);

// 📊 liste électeurs
router.get(
  "/all",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allUsers
);

// 🗑 suppression
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);


module.exports = router;