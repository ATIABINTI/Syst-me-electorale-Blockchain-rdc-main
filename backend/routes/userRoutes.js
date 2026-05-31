const express = require("express");
const router = express.Router();

const {
  getUser,
  allUsers,
  deleteUser,
  editUser,
  logoutUser
} = require("../controllers/userController");

const { vote } = require("../controllers/voteController");

router.get("/me", getUser);
router.get("/", allUsers);
router.delete("/:id", deleteUser);
router.put("/:id", editUser);
router.post("/vote", vote);
router.get("/logout", logoutUser);

module.exports = router;