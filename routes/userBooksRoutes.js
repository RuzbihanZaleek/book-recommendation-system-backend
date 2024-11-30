const express = require("express");
const {
  addBookToLibrary,
  getUserLibrary,
  removeBookFromLibrary,
  updateBookStatus,
  getUserLibraryBookById,
} = require("../controllers/userBooksController/userBooksController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authenticate, getUserLibrary);
router.get("/:bookId", authenticate, getUserLibraryBookById);
router.post("/", authenticate, addBookToLibrary);
router.put("/:bookId", authenticate, updateBookStatus);
router.delete("/:bookId", authenticate, removeBookFromLibrary);

module.exports = router;
