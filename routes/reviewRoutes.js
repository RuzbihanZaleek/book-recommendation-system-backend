const express = require("express");
const {
  createReview,
  getAllReviews,
  getReviewsByUser,
  getReviewsForBook,
  deleteReviewController,
} = require("../controllers/reviewController/reviewController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authenticate, createReview);
router.get("/", authenticate, getAllReviews);
router.get("/user", authenticate, getReviewsByUser);
router.get("/book/:bookId", authenticate, getReviewsForBook);
router.delete("/:bookId", authenticate, deleteReviewController);

module.exports = router;
