const { REVIEW } = require("../../constants/constants");
const {
  createReviewService,
  getAllReviewsService,
  getReviewsByUserService,
  getReviewsForBookService,
  deleteReviewService,
} = require("../../services/reviewService/reviewService");
const sendResponse = require("../../utils/response");

const createReview = async (req, res) => {
  const { content, rating, bookId } = req.body;
  try {
    const result = await createReviewService(
      req.user.userId,
      bookId,
      content,
      rating
    );
    sendResponse(res, result.status, result.message, result.data);
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, REVIEW.MESSAGES.CREATE_ERROR, null);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const result = await getAllReviewsService();
    sendResponse(res, result.status, result.message, result.data);
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, REVIEW.MESSAGES.FETCH_ERROR, null);
  }
};

const getReviewsByUser = async (req, res) => {
  try {
    const result = await getReviewsByUserService(req.user.userId);
    sendResponse(res, result.status, result.message, result.data);
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, REVIEW.MESSAGES.FETCH_ERROR, null);
  }
};

const getReviewsForBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const result = await getReviewsForBookService(bookId);
    sendResponse(res, result.status, result.message, result.data);
  } catch (error) {
    console.error(error.message);
    sendResponse(res, 500, REVIEW.MESSAGES.FETCH_ERROR, null);
  }
};

const deleteReviewController = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    const result = await deleteReviewService(req.user.userId, bookId);
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, REVIEW.MESSAGES.DELETE_ERROR, null);
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByUser,
  getReviewsForBook,
  deleteReviewController,
};
