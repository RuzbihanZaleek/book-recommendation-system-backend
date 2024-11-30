const { USERBOOK } = require("../../constants/constants");
const {
  addBookToLibraryService,
  getUserLibraryService,
  removeBookFromLibraryService,
  updateBookStatusService,
  getUserLibraryBookByIdService,
} = require("../../services/userBooksService/userBooksService");
const sendResponse = require("../../utils/response");

const addBookToLibrary = async (req, res) => {
  try {
    const { bookId } = req.body;

    const result = await addBookToLibraryService(req.user.userId, bookId);

    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, USERBOOK.MESSAGES.CREATE_ERROR, null);
  }
};

const getUserLibrary = async (req, res) => {
  try {
    const result = await getUserLibraryService(req.user.userId);

    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, USERBOOK.MESSAGES.FETCH_ERROR, null);
  }
};

const getUserLibraryBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const result = await getUserLibraryBookByIdService(req.user.userId, bookId);
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, USERBOOK.MESSAGES.FETCH_ERROR, null);
  }
};

const updateBookStatus = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;

    const result = await updateBookStatusService(
      req.user.userId,
      bookId,
      status
    );

    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, USERBOOK.MESSAGES.UPDATE_ERROR, null);
  }
};

const removeBookFromLibrary = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const result = await removeBookFromLibraryService(req.user.userId, bookId);

    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, USERBOOK.MESSAGES.DELETE_ERROR, null);
  }
};

module.exports = {
  addBookToLibrary,
  getUserLibrary,
  getUserLibraryBookById,
  updateBookStatus,
  removeBookFromLibrary,
};
