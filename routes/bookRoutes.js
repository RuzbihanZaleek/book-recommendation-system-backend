const express = require("express");
const {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
} = require("../controllers/bookController/bookController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authenticate, getAllBooks);
router.get("/search", authenticate, searchBooks);
router.get("/:id", authenticate, getBookById);
router.post("/", authenticate, createBook);
router.put("/:id", authenticate, updateBook);
router.delete("/:id", authenticate, deleteBook);

module.exports = router;
