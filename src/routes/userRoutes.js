const express = require("express");
const router = express.Router();
// Functions
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// Middleware
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
