const express = require("express");
const router = express.Router();
// Function
const {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
// Middleware
const upload = require("../middlewares/uploadMiddleware");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, upload.single("image"), createNews);
router.get("/", getNews);
router.get("/:id", getNewsById);
router.put("/:id", auth, upload.single("image"), updateNews);
router.delete("/:id", auth, deleteNews);

module.exports = router;
