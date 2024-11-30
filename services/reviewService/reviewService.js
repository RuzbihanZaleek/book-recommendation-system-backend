const { REVIEW, BOOK } = require("../../constants/constants");
const Book = require("../../models/Book");
const Review = require("../../models/Review");
const User = require("../../models/User");

const createReviewService = async (userId, bookId, content, rating) => {
  try {
    if (!userId || !bookId || !content || !content.trim() || !rating) {
      return {
        status: 400,
        message: REVIEW.VALIDATIONS.PARAMS_REQUIRED,
        data: null,
      };
    }

    // check if book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      return { status: 404, message: BOOK.VALIDATIONS.NOT_FOUND, data: null };
    }

    //check if user has already added a review for same book
    const existingReview = await Review.findOne({
      where: { UserId: userId, BookId: bookId },
    });

    if (existingReview) {
      return {
        status: 400,
        message: REVIEW.VALIDATIONS.ALREADY_REVIEWED,
        data: null,
      };
    }

    const review = await Review.create({
      UserId: userId,
      BookId: bookId,
      content,
      rating,
    });
    return {
      status: 201,
      message: REVIEW.MESSAGES.CREATE_SUCCESS,
      data: review,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: REVIEW.MESSAGES.CREATE_ERROR, data: null };
  }
};

const getAllReviewsService = async () => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
        {
          model: Book,
          attributes: ["id", "title", "author"],
        },
      ],
    });
    return {
      status: 200,
      message: REVIEW.MESSAGES.FETCH_SUCCESS,
      data: reviews,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: REVIEW.MESSAGES.FETCH_ERROR, data: null };
  }
};

const getReviewsByUserService = async (userId) => {
  try {
    const reviews = await Review.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Book,
          attributes: ["id", "title", "author"],
        },
      ],
    });

    if (reviews.length === 0) {
      return {
        status: 404,
        message: REVIEW.MESSAGES.NO_REVIEWS_BY_USER,
        data: null,
      };
    }

    return {
      status: 200,
      message: REVIEW.MESSAGES.FETCH_SUCCESS,
      data: reviews,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: REVIEW.MESSAGES.FETCH_ERROR, data: null };
  }
};

const getReviewsForBookService = async (bookId) => {
  try {
    const reviews = await Review.findAll({
      where: { BookId: bookId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
      ],
    });

    if (reviews.length === 0) {
      return {
        status: 404,
        message: REVIEW.MESSAGES.NO_REVIEWS_BY_BOOK,
        data: null,
      };
    }

    return {
      status: 200,
      message: REVIEW.MESSAGES.FETCH_SUCCESS,
      data: reviews,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: REVIEW.MESSAGES.FETCH_ERROR, data: null };
  }
};

const deleteReviewService = async (userId, bookId) => {
  try {
    const review = await Review.findOne({
      where: { UserId: userId, BookId: bookId },
    });

    if (!review) {
      return {
        status: 404,
        message: REVIEW.VALIDATIONS.NOT_FOUND,
        data: null,
      };
    }

    await review.destroy();
    return { status: 200, message: REVIEW.MESSAGES.DELETE_SUCCESS, data: null };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: BOOK.MESSAGES.DELETE_ERROR, data: null };
  }
};

module.exports = {
  createReviewService,
  getAllReviewsService,
  getReviewsByUserService,
  getReviewsForBookService,
  deleteReviewService,
};
