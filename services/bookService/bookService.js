const { Op } = require("sequelize");
const { BOOK } = require("../../constants/constants");
const isValidDate = require("../../utils/dateValidation");
const Book = require("../../models/Book");

const createBookService = async (
  title,
  author,
  description,
  genre,
  published_date
) => {
  try {
    if (!title || !author) {
      return {
        status: 400,
        message: BOOK.VALIDATIONS.PARAMS_REQUIRED,
        data: null,
      };
    }

    if (published_date && !isValidDate(published_date)) {
      return {
        status: 400,
        message: BOOK.VALIDATIONS.INVALID_DATE_FORMAT,
        data: null,
      };
    }

    const existingBook = await Book.findOne({ where: { title, author } });
    if (existingBook) {
      return {
        status: 400,
        message: BOOK.VALIDATIONS.DUPLICATE_BOOK(title, author),
        data: null,
      };
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      published_date,
    });
    return { status: 201, message: BOOK.MESSAGES.CREATE_SUCCESS, data: book };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: BOOK.MESSAGES.CREATE_ERROR, data: null };
  }
};

const getAllBooksService = async () => {
  try {
    const books = await Book.findAll();
    return { status: 200, message: BOOK.MESSAGES.FETCH_SUCCESS, data: books };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: BOOK.MESSAGES.FETCH_ERROR, data: null };
  }
};

const getBookByIdService = async (id) => {
  const book = await Book.findByPk(id);
  try {
    if (!book) {
      return { status: 404, message: BOOK.VALIDATIONS.NOT_FOUND, data: null };
    }
    return { status: 200, message: BOOK.MESSAGES.FETCH_SUCCESS, data: book };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: BOOK.MESSAGES.FETCH_ERROR, data: null };
  }
};

const updateBookService = async (
  id,
  title,
  author,
  description,
  genre,
  published_date
) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return { status: 404, message: BOOK.VALIDATIONS.NOT_FOUND, data: null };
    }

    // Check if another book with the same title and author exists
    const duplicateBook = await Book.findOne({
      where: { title, author, id: { [Op.ne]: id } },
    });

    if (duplicateBook) {
      return {
        status: 400,
        message: BOOK.VALIDATIONS.DUPLICATE_BOOK(title, author),
        data: null,
      };
    }

    if (published_date && !isValidDate(published_date)) {
      return {
        status: 400,
        message: BOOK.VALIDATIONS.INVALID_DATE_FORMAT,
        data: null,
      };
    }

    await book.update({ title, author, description, genre, published_date });
    return { status: 200, message: BOOK.MESSAGES.UPDATE_SUCCESS, data: book };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: BOOK.MESSAGES.UPDATE_ERROR, data: null };
  }
};

const deleteBookService = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return { status: 404, message: BOOK.VALIDATIONS.NOT_FOUND, data: null };
    }

    await book.destroy();
    return { status: 200, message: BOOK.MESSAGES.DELETE_SUCCESS, data: null };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: BOOK.MESSAGES.DELETE_ERROR, data: null };
  }
};

const searchBooksService = async (query) => {
  try {
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } }, 
          { genre: { [Op.iLike]: `%${query}%` } }, 
          { author: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (books.length === 0) {
      return {
        status: 404,
        message: BOOK.MESSAGES.NO_RESULTS_FOUND,
        data: null,
      };
    }

    return {
      status: 200,
      message: BOOK.MESSAGES.FETCH_SUCCESS,
      data: books,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: BOOK.MESSAGES.SEARCH_ERROR, data: null };
  }
};

module.exports = {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
  searchBooksService,
};
