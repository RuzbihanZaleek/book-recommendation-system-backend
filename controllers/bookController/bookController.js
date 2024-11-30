const { BOOK } = require("../../constants/constants");
const {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
  searchBooksService,
} = require("../../services/bookService/bookService");
const sendResponse = require("../../utils/response");

const createBook = async (req, res) => {
  const { title, author, description, genre, published_date } = req.body;

  try {
    const result = await createBookService(
      title,
      author,
      description,
      genre,
      published_date
    );
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, BOOK.MESSAGES.CREATE_ERROR, null);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const result = await getAllBooksService();
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, BOOK.MESSAGES.FETCH_ERROR, null);
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getBookByIdService(id);
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, BOOK.MESSAGES.FETCH_ERROR, null);
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, genre, published_date } = req.body;

  try {
    const result = await updateBookService(
      id,
      title,
      author,
      description,
      genre,
      published_date
    );
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, BOOK.MESSAGES.UPDATE_ERROR, null);
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteBookService(id);
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, BOOK.MESSAGES.DELETE_ERROR, null);
  }
};

const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return sendResponse(res, 400, BOOK.VALIDATIONS.QUERY_REQUIRED, null);
    }

    const result = await searchBooksService(query);

    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, BOOK.MESSAGES.SEARCH_ERROR, null);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
};
